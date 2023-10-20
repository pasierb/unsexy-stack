import express from "express";
import passport from "passport";
import crypto from "crypto";
import { knex } from "../../lib/knex.mjs";
import { authInvalidCredentials } from "../../lib/error-codes.mjs";

export const router = express.Router();

router.post("/login/password", function loginPassword(req, res, next) {
  passport.authenticate("local", {}, function (err, user, info, status) {
    console.log({ err, user, info, status });

    if (!user) {
      return res.redirect(`/login?error=${authInvalidCredentials}`);
    } else {
      return res.redirect("/");
    }
  })(req, res, next);
});

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
