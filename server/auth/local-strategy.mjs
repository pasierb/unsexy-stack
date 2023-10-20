import LocalStrategy from "passport-local";
import crypto from "crypto";
import { knex } from "../../lib/knex.mjs";

export const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async function verify(email, password, done) {
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
          return done(err);
        }
        if (
          !crypto.timingSafeEqual(
            Buffer.from(user.hashed_password, "hex"),
            hashedPassword
          )
        ) {
          return done(null, false, {
            message: "Incorrect username or password.",
          });
        }

        return done(null, { id: user.id, email: user.email });
      }
    );
  }
);
