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
        console.log("cc 0");
        users.findOne({
            username: req.body.username
        }).then(user => {
            console.log("Coucou1")
            if (user) {
                console.log("Coucou2");
                const err = new Error('Username already taken');
                next(error);
            } else {
                console.log("Coucou3")
                bcrypt.hash(req.body.password, 12).then(hashedPassword => {
                    const newUser = {
                        username: req.body.username,
                        password: hashedPassword
                    };
                    
                    users.insert(newUser).then(insertedUser => {
                        delete insertedUser.password;
                        res.json(insertedUser);
                console.log("coucou4")
                    });
                });
            }
        })
        .catch(err => console.log(err));
    } else{
        console.log("coucouerreur");
        next(result.error);
    }
});

 module.exports = router;