import { Router } from "express";
import passport from "passport";
import "./strategy";

export const router = Router();

router.get("/login", passport.authenticate("discord"));

router.get(
  "/callback",
  passport.authenticate("discord", {
    failureRedirect: process.env.SERVER_DOMAIN || "http://localhost:3000",
  }),
  (_, res) => {
    return res.redirect(
      process.env.REDIRECT_URL || "http://localhost:3000/dashboard"
    );
  }
);
