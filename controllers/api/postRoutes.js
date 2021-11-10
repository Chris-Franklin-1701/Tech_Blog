const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
    try{
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment, attributes: ['user_id', 'comment_content', 'createdOn'],
                    include: [{model: User, attributes: ['name']}],
                },
                {
                    model: User, attributes: ['name']
                },
            ],
        });
        const currentPost = postData.get({ plain: true });
        res.render('homepagePost', { currentPost, logged_in: req.session.logged_in});
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
    const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
        title: req.body.title,
        post_content: req.body.post_content,
    });
    //res.redirect('./dashboard');

    res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/:id', withAuth, async (req, res) => {
    try {
    const postUpdate = await Post.update({
        ...req.body,
        title: req.body.title,
        post_content: req.body.post_content,
    },
    {
        where: {
            id: req.params.id
        }
    });

    res.status(200).json(postUpdate);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
    const postDelete = await Post.destroy({
        where: {
            id: req.params.id,
        },
    });

    if (!postDelete) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
    }

    res.status(200).json(postDelete);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
