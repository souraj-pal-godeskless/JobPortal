const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

exports.signup = (req , res) => {
    User.findOne({email: req.body.email})
    .exec( async (error, user) =>{
        if (error) {
            return res.status(400).json({
                message: 'Something went Wrong'
            })
        }
        if(user) return res.status(400).json({
            message: 'User already registered'
        });

        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        console.log("🚀 ~ file: auth.js ~ line 27 ~ .exec ~ password", password)
        console.log("🚀 ~ file: auth.js ~ line 25 ~ .exec ~ hash_password", hash_password)
        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            role: 'admin'
        });
        console.log("🚀 ~ file: auth.js ~ line 34 ~ .exec ~ _user", _user)
        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: "Something Wrong",
                    error: error
                })
            }
            if (data) {
                return res.status(201).json({
                    message: 'Admin successfully created',
                    user: data
                })
            }
            
        })

    });
}

exports.signin = async (req , res) => {
    User.findOne({email: req.body.email})
    .exec( async (error, user) =>{
        if (error) {
            return res.status(400).json({
                message: 'Such User Not Found'
            })
        }
        if(user){
            user.authenticate(req.body.password).then((ress) => {
                console.log("🚀 ~ file: auth.js ~ line 69 ~ user.authenticate ~ ress", ress)
            })
            const hash_password = await user.authenticate(req.body.password);
            console.log("🚀 ~ file: auth.js ~ line 69 ~ .exec ~ hash_password", hash_password)
            if (user.authenticate(req.body.password) && user.role == 'admin') {
                console.log("🚀 ~ file: auth.js ~ line 70 ~ .exec ~ user.authenticate(req.body.password)", user.authenticate(req.body.password))
                const token = jwt.sign({_id: user._id ,role: user.role}, process.env.JWT_SECRET, {expiresIn: '1y'})
                const {_id, firstName, lastName, email, role, fullName} = user;
                res.cookie('token', token, { expiresIn: '1d'})
                res.status(200).json({
                  token,
                  user: {
                    _id,
                    firstName,
                    lastName,
                    email,
                    role,
                    fullName,
                  },
                });
            }else{
                return res.status(400).json({
                    message: 'Invalid Passord'
                })
            }

        }else{
            return res.status(400).json({
                message: 'Something went wrong'
            });
        } 

    });
}

exports.signout = (req , res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Signout successfull...!"
    })
}
