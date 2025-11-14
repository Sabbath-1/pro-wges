const express = require('express');
const router = express.Router();
const User = require('../js/user');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
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

router.post('/', async (req, res) => {
   try {
     const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).send('All fields are required');
    }
    const extingUser = await User.findOne({ $or: [{ email }, { name }]  });
    if (extingUser) {
        return res.status(400).send('User already exists');
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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }
        res.send('Login successful');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

router.route('/:id').get((req, res) => {
    console.log(req.user)
    res.send(`Get User ID: ${req.params.id}`);
}).put((req, res) => {
    res.send(`Update User ID: ${req.params.id}`);
}).delete((req, res) => {
    res.send(`Delete User ID: ${req.params.id}`);
})

const users = [{name: "Kyle"}, {name: "Walker"}]
router.param("id", (req, res, next, id) => {
    req.user = users[id]
    next()
})

module.exports = router;