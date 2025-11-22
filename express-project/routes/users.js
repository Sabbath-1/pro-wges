const express = require('express');
const router = express.Router();
const User = require('../js/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/', checkAuthenticated, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }catch (err) {
        res.status(500).json({message: err.message})
    }
});

router.get('/new', (req, res) => {
    res.render('users/newUser');
});

router.post('/',checkNotAuthenticated, async (req, res) => {
   try {
     const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }
    const extingUser = await User.findOne({ $or: [{ email }, { name }]  });
    if (extingUser) {
        return res.status(400).json({message: 'User already exists'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: { id: savedUser._id, name: savedUser.name, email: savedUser.email } });
   } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
}
})


router.post('/register',checkNotAuthenticated, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const existingUser = await User.findOne({ $or: [{ email }, { name }] });
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: { id: savedUser._id, name: savedUser.name, email: savedUser.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
})

// UPDATED LOGIN ROUTE - Returns JSON instead of redirecting
router.post('/login', checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Error during authentication', error: err });
        }
        if (!user) {
            return res.status(401).json({ message: info.message || 'Invalid credentials' });
        }
        
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error logging in', error: err });
            }
            return res.json({ 
                message: 'Login successful',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        });
    })(req, res, next);
});

// Add logout route
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

// Check authentication status
router.get('/current', checkAuthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ 
            authenticated: true,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email
            }
        });
    } else {
        res.json({ authenticated: false });
    }
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
}
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.status(403).json({ message: 'Already authenticated' });
    }
    next();
}

module.exports = router;