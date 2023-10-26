import express from "express";
import passport from "passport";
import session from "express-session";
import connectSqlite3 from "connect-sqlite3";
import { localStrategy } from "./local-strategy.mjs";
import { router } from "./router.mjs";

/**
 *
 * @param {express.Express} app
 */
export function mountAuth(app, basePath = "/auth") {
  const SQLiteStore = connectSqlite3(session);
  app.use(
    session({
      store: new SQLiteStore({ db: "./storage/sessions.sqlite3" }),
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

  passport.use("local", localStrategy);

  app.use(basePath, router);
}
