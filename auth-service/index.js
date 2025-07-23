const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const cookieSession = require("cookie-session");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: ["secretkey"] }));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB
mongoose.connect("mongodb://mongo:27017/hotel-auth");

// User Model
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    googleId: String,
    facebookId: String,
    email: String,
    name: String,
  })
);

// Passport Config
passport.use(
  new JwtStrategy(
    { jwtFromRequest: (req) => req.cookies.jwt, secretOrKey: "secretkey" },
    (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then((user) => done(null, user))
        .catch((err) => done(err, false));
    }
  )
);

// Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: "GOOGLE_CLIENT_ID",
      clientSecret: "GOOGLE_SECRET",
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (token, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((user) => {
        if (user) return done(null, user);
        new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
        })
          .save()
          .then((newUser) => done(null, newUser));
      });
    }
  )
);

// Facebook OAuth
passport.use(
  new FacebookStrategy(
    {
      clientID: "FACEBOOK_APP_ID",
      clientSecret: "FACEBOOK_APP_SECRET",
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "emails", "name"],
    },
    (token, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }).then((user) => {
        if (user) return done(null, user);
        new User({
          facebookId: profile.id,
          email: profile.emails[0].value,
          name: profile.name.givenName,
        })
          .save()
          .then((newUser) => done(null, newUser));
      });
    }
  )
);

// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, "secretkey", {
      expiresIn: "1h",
    });
    res
      .cookie("jwt", token, { httpOnly: true })
      .redirect("http://localhost:3000");
  }
);

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "email" })
);
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, "secretkey", {
      expiresIn: "1h",
    });
    res
      .cookie("jwt", token, { httpOnly: true })
      .redirect("http://localhost:3000");
  }
);

app.listen(4000, () => console.log("Auth Service Running on Port 4000"));
