const Post = require('../models/posts')

exports.create = (req , res) => {
    const {
        title,
        description,
        location,
        deadline,
        contactNumber,
        email,
    } = req.body;
    const _post = new Post({
        title,
        description,
        location,
        deadline,
        contactNumber,
        email,
    });

    _post.save((error, data) => {
        if (error) {
            return res.status(400).json({
                message: "Something Wrong",
                error: error
            })
        }
        if (data) {
            return res.status(201).json({
                message: 'Post successfully created',
                user: data
            })
        }
        
    })
}



exports.update = (req , res) => {
    const {
        title,
        description,
        location,
        deadline,
        contactNumber,
        email,
        _id
    } = req.body;
    const _post = new Post({
        title,
        description,
        location,
        deadline,
        contactNumber,
        email,
    });

    Post.findOneAndUpdate({ _id }, (error, data) => {
        if (error) {
            return res.status(400).json({
                message: "Something Wrong",
                error: error
            })
        }
        if (data) {
            return res.status(201).json({
                message: 'Post successfully created',
                user: data
            })
        }
        
    })
}

