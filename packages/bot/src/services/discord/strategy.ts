import passport from "passport";
import { Strategy } from "passport-discord";

const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = process.env;

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new Strategy(
    {
      clientID: CLIENT_ID!,
      clientSecret: CLIENT_SECRET!,
      callbackURL: CALLBACK_URL!,
      scope: ["identify", "guilds"],
    },
    (_, __, profile, done) => done(null, profile)
  )
);
