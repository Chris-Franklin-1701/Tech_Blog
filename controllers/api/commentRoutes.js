const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        // Get all Comments and JOIN with user data
        const commentData = await Comment.findAll({
            include: [
                {
                    user_id: req.session.user_id,
                    post_id: req.body.post_id,
                    comment_content: req.body.comment_content,
                },
            ],
        });
    
        // Serialize data so the template can read it
        const comments = commentData.map((comment) => comment.get({ plain: true }));
    
        // Pass serialized data and session flag into template
        res.render('dashboard', { 
            comments, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        post_id: req.body.post_id,
        comment_content: req.body.comment_content,
    });

    res.status(200).json(newComment);
    } catch (err) {
        es.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
            id: req.params.id,
            user_id: req.session.user_id,
            },
        });
        
        if (!commentData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
        }
        
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;