const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const withAuth = require('../utils/auth');

// Display all posts for everyone, no Auth required.
router.get('/', async (req, res) => {
    try {
    const postData = await Post.findAll({
        include: [{ model: User, attributes: ['id', 'name']}],
    });

    const currentPosts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { currentPosts, logged_in: req.session.logged_in,});
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login route rendering
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
    res.redirect('/');
    return;
    }

    res.render('login');
});

// Create New route rendering
router.get('/createNew', (req, res) => {
    if(req.session.logged_in){
        res.redirect('/');
        return;
    }
    res.render('createNew');
});

module.exports = router;
