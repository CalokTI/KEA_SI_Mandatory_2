import express from "express";
const app = express();

import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
		},
		(accessToken, refreshToken, profile, done) => {
			// Here, you can handle the user data returned by Google
			// and store it in your database or session as needed.
			return done(null, profile);
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

app.use(session({
	secret:	"keyboard cat",
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
	// Here, you can redirect the user to your application's homepage
	res.redirect("/success.html");
});


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

app.post("/logout", (req, res) => {
	req.logout((err) => {
		if (err) {
			console.log("Error logging out: ", err);
		}
		req.session.destroy((err) => {
			if (err) {
				console.log("Error destroying session: ", err);
			} else {
				res.redirect("/");
			}
		});
	});
});

app.get("/profile", isLoggedIn, (req, res) => {
	// Here, you can render the user's profile page
	res.render("profile", { user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
