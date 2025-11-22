const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../js/user');

function initializePassport(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                return done(null, false, { message: 'No user with that email' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (err) {
            return done(err);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    });
}

module.exports = initializePassport;