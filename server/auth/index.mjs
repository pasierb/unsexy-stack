import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import connectSqlite3 from "connect-sqlite3";
import crypto from "crypto";
import { knex } from "../../lib/knex.mjs";

/**
 *
 * @param {express.Express} app
 */
export function mountAuth(app, basePath = "/auth") {
  const SQLiteStore = connectSqlite3(session);
  app.use(
    session({
      store: new SQLiteStore({ db: "sessions.sqlite3" }),
      secret: "keyboard cats", // TODO: Change this.
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.authenticate("session"));

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, { id: user.id, email: user.email });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });

  passport.use(
    "local",
    new LocalStrategy({ usernameField: "email" }, async function verify(
      email,
      password,
      done
    ) {
      const users = await knex
        .from("users")
        .where({ email })
        .select("*")
        .limit(1);
      const user = users[0];
      if (!user) {
        return done(null, false);
      }

      crypto.pbkdf2(
        password,
        Buffer.from(user.salt, "hex"),
        310000,
        32,
        "sha256",
        function (err, hashedPassword) {
          if (err) {
            console.log("Error verifying password");
            return done(err);
          }
          if (
            !crypto.timingSafeEqual(
              Buffer.from(user.hashed_password, "hex"),
              hashedPassword
            )
          ) {
            console.log("Incorrect password");
            return done(null, false, {
              message: "Incorrect username or password.",
            });
          }

          return done(null, { id: user.id, email: user.email });
        }
      );
    })
  );

  const router = express.Router();

  router.post(
    "/login/password",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

  router.post("/signup/password", (req, res, next) => {
    const salt = crypto.randomBytes(16);

    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) return next(err);

        knex
          .from("users")
          .insert({
            email: req.body.email,
            hashed_password: hashedPassword.toString("hex"),
            salt: salt.toString("hex"),
          })
          .then(() => {
            res.redirect("/");
          })
          .catch((err) => {
            next(err);
          });
      }
    );
  });

  router.get("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }

      res.redirect("/");
    });
  });

  app.use(basePath, router);
}
