const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('A user just a user');
});

router.get('/new', (req, res) => {
    res.render('users/newUser');
});

router.post('/',(req, res) => {
    console.log(req.body.name)
    const isValid = true;
    if(isValid){
        users.push({name: req.body.name})
    }
    res.redirect(`/users/${users.length -1}`);
})

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