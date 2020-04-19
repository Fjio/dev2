const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const db = require('../db/connection');

const users = db.get('users');
users.createIndex('username', { unique:true });
 
 const router = express.Router();

const schema =  Joi.object().keys({
    username: Joi.string().regex(/(^[a-zA-Z0-9_])*$/).min(2).max(30).required(),
    password: Joi.string().trim().min(10).required()
});

 //any Route going thru /auth
 router.get('/',(req,res) => {
    res.json({
        message: 'locked'
    });
 });

// POST /auth/signup

router.post('/signup', (req,res,next) =>{
    const result = Joi.validate(req.body,schema);
    if (result.error === null) {
        users.findOne({
            username: req.body.username
        }).then(user => {
            if (user) {
                const error = new Error('Username already taken');
                res.status(409);
                next(error);
            } else {
                bcrypt.hash(req.body.password, 12).then(hashedPassword => {
                    const newUser = {
                        username: req.body.username,
                        password: hashedPassword
                    };
                    users.insert(newUser).then(insertedUser => {
                        delete insertedUser.password;
                        res.json(insertedUser);
                    });
                });
            }
        })
        .catch(err => console.log(err));
    } else{
        res.status(422);
        next(result.error);
    }
});

 module.exports = router;