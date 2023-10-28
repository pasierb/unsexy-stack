import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { knex } from "../../lib/knex.mjs";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: new URL("/auth/google/callback", process.env.PUBLIC_URL).href,
  },
  async function (accessToken, refreshToken, profile, cb) {
    const verifiedEmails = profile.emails.filter(({ verified }) => verified);
    const email = verifiedEmails[0]?.value;
    if (!email) {
      return cb(new Error("User does not have verified email"), null);
    }

    try {
      let user = (
        await knex.from("users").where({ email }).select("*").limit(1)
      )[0];

      if (user) {
        return cb(null, user);
      } else {
        user = (await knex.from("users").insert({ email }).returning("*"))[0];
        return cb(null, user);
      }
    } catch (err) {
      return cb(err, null);
    }
  }
);
