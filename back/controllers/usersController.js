var bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
var models = require('../models');

module.exports = {
    register: function (req, res) {
    
        var username = req.body.username;
        var password = req.body.password;
        
        if(username == null){
            return res.status(400).json({ 'missing parameters': 'username required'});
        }else if(password == null){
            return res.status(400).json({ 'missing parameters': 'password required'});
        }

        models.user.findOne({
            attributes: ['username'],
            where: { username : username }
        })
        .then(function(userFound){
            if(!userFound){
                bcrypt.hash(password, 5, function(err,bcryptedPassword){
                    var newUser = models.user.create({
                        username : username,
                        password : bcryptedPassword
                    })
                    .then(function(newUser){
                        return res.status(201).json({ 'userId':newUser.id })
                    })
                    .catch(function(err){
                        return res.status(500).json({ 'error': 'cannot add user'})
                    })
                });
                
            }else return res.status(409).json({'error':'user already exist'});
        })
        .catch(function(err){
            return res.status(409).json({'error':'unable to verify user'});
        });
    },
    login: function (req, res) {

        var username = req.body.username;
        var password = req.body.password;
        
        if(username == null){
            return res.status(400).json({ 'missing parameters': 'username required'});
        }else if(password == null){
            return res.status(400).json({ 'missing parameters': 'password required'});
        }
        
        models.user.findOne({
            where: { username : username }
        })
            .then(function(userFound){
                if(userFound){
                    bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
                        if(resBycrypt){
                            return res.status(200).json({
                                'userId' : userFound.id,
                                'token'  : jwtUtils.userTokenGenerator(userFound)
                            })
                        }else{
                            return res.status(403).json({  'error': "invalid password"})
                        }
                    })
                }
                else return res.status(409).json({'error':'user not exist'});
            })
            .catch(function(err){
                return res.status(500).json({'error': 'cannot log on user'});
            })
    },
    getUserProfile: function(req,res){
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if(userId < 0){
            return res.status(400).json({'error' : 'wrong token'});
        }
        models.user.findOne({
            attributes: ['id','username'],
            where: { id: userId }
        })
        .then(function(user){
            if(user){
                res.status(201).json(user);
            } else {
                res.status(409).json({ 'error' : 'user not found' });
            }
        })
        .catch(function(err){
            res.status(500).json({ 'error' : 'cannot fetch user' });
        });
    },
    updateProfil: function(req, res){
        // var headerAuth = req.headers['authorization'];
        // var userId = jwtUtils.getUserId(headerAuth);

        // var username = req.body.username;
        // var password = req.body.password;
        
        // if(username == null){
        //     return res.status(400).json({ 'missing parameters': 'username required'});
        // }else if(password == null){
        //     return res.status(400).json({ 'missing parameters': 'password required'});
        // }

        // models.user.findOne({
        //     attributes: ['id','username'],
        //     where: { id: userId } 
        // })
        // .then(function(userFound){
        //     if(userFound){
        //         bcrypt.hash(password, 5, function(err,bcryptedPassword){
        //             models.user.update({
        //                 username : username,
        //                 password : bcryptedPassword,
        //                 where: {id: user}
        //             })
        //             .then(function(){
        //                 return res.status(200).json({ 'success': 'user updated'})
        //             })
        //             .catch(function(err){
        //                 return res.status(500).json({ 'error': 'cannot update user'})
        //             })
        //         });
        //     } else {
        //         res.status(409).json({ 'error' : 'user not found' });
        //     }
        // })
        // .catch(function(err){
        //     return res.status(500).json({'error': 'unable to verify user'});
        // })
    }


}