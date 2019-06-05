const express = require('express');
const router = new express.Router;
const auth = require('../middleware/auth')

router.get('', (req, res) => {
    res.render('index')
});

router.get('/profile', auth, (req, res) => {
    res.render('profile')
});

router.get('/editprofile', auth, (req, res) => {
    res.render('editprofile')
});

router.get('/editTask/:id', auth, (req, res) => {
    res.render('editTask')
});


module.exports = router