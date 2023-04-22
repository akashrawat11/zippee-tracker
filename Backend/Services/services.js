const db = require("../Models")
const {verifyToken, generateToken} = require("./authorization")
const { User } = db;
const bcrypt = require("bcrypt")

const login = (req, res, next)=>{
    const { email, password } = req.body;
    User.findOne({ where: { 
                email: email
            } }
        ).then(user => {
            if(user){
                bcrypt.compare(password, user.password, function(err, result) {
                    if (result) {
                        res.status(200).json({
                            token: generateToken(user),
                            id: user.id
                        })
                    }else{
                        res.status(403);
                        next(new Error('Invalid Password'));
                    }
                });
            }
            else{
                res.status(404);
                next(new Error('Not Found'));
            }
        });
}

const createUser = (req, res)=>{
    const {name, email, password, phoneNo} = req.body;

    bcrypt.hash(password, 10, function(err, hash) {
            User.create({
            name,
            email,
            password: hash,
            phoneNo
        }).then(user => {
            res.status(201).json(user)
        })
        });
}

const getUsers = (req, res)=>{
    User.findAll().then(users => {
        res.status(200).json({result: users})
    });
}

const getUser = (req, res, next)=>{
    const token = req.headers.authorization;
    const id = req.params.id;
    
    if (!token) {
        res.status(403);
        next(new Error('Missing authorization header' ));
    }

    const decoded = verifyToken(token, 'secretkey');
    if (!decoded) {
        res.status(403);
        next(new Error('Invalid token' ));
    }

    User.findOne({ where: { 
                id: id
            } }
        ).then(user => {
            if(user){
                res.status(200).json(user);
            }else{
                res.status(404);
                next(new Error('Not Found'));
            }
    });
}

module.exports = {login, getUser, getUsers, createUser}