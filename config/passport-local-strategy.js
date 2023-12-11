const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

// Passport Local Strategy Configuration
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true
}, async function (req,email, password, done) {
    try {
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
            // console.log('Invalid Username/Password');
            req.flash('error','Invalid Username/Password')
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        // console.log('Error in finding User --> passport');
        req.flash('error',err)
        return done(err);
    }
}));


// Passport Serialization Configuration
passport.serializeUser(function (user, done) {
    // Store user ID in the session to serialize the user
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        // Deserialize the user based on the stored user ID in the session
        const user = await User.findById(id);

        // User is successfully deserialized
        return done(null, user);
    } catch (err) {
        console.log('Error in finding user ---> passport', err);
        return done(err);
    }
});

// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
    //if yes than pass on to next function
    if (req.isAuthenticated()) {
        return next();
    }
    //if not than redirect to sign-in
    return res.redirect('/users/sign-in')
}


passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user; // Corrected from req.locals.user to res.locals.user
    }
    next();
};

// Export the configured Passport instance
module.exports = passport;
