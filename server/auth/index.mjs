import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import connectSqlite3 from "connect-sqlite3";

/**
 *
 * @param {express.Express} app
 */
export function mountAuth(app, basePath = "/auth") {
  const SQLiteStore = connectSqlite3(session);
  app.use(
    session({
      store: new SQLiteStore({ db: "sessions.sqlite3" }),
      secret: "keyboard cats",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.authenticate("session"));

  passport.use(
    "local",
    new LocalStrategy(function verify(username, password, done) {
      return done(null, { username, password });
    })
  );

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });

  const router = express.Router();

  router.post(
    "/login/password",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

  app.use(basePath, router);
}
