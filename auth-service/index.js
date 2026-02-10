const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const cookieSession = require("cookie-session");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const UserModel = require("./models/user");

const User = UserModel(db, db.Sequelize.DataTypes);

const app = express();

// Middleware
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({ credentials: true, origin: FRONTEND_URL }));
app.use(bodyParser.json());
app.use(cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: [JWT_SECRET] }));
app.use(passport.initialize());
app.use(passport.session());

// MySQL/Sequelize
db.sync().then(() => {
  console.log("MySQL synced for auth-service");
});

// Passport Config - JWT Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies?.jwt || null,
      ]),
      secretOrKey: JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findByPk(jwtPayload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

// Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (token, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ where: { googleId: profile.id } });
        if (user) {
          return done(null, user);
        }
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
        });
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

// Facebook OAuth
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "emails", "name"],
    },
    async (token, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ where: { facebookId: profile.id } });
        if (user) {
          return done(null, user);
        }
        user = await User.create({
          facebookId: profile.id,
          email: profile.emails[0].value,
          name: profile.name.givenName,
        });
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, { httpOnly: true }).redirect(FRONTEND_URL);
  },
);

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "email" }),
);
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, { httpOnly: true }).redirect(FRONTEND_URL);
  },
);

app.listen(4000, () => console.log("Auth Service Running on Port 4000"));
