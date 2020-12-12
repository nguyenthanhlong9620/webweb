const express = require('express');
const Profile = require('../core/profile');
const User = require('../core/user');
const pool = require('../core/pool');
const { compareSync } = require('bcrypt');
const router = express.Router();
var mysql = require('mysql');

// create an object from the class User in the file core/user.js
const user = new User();
const profile = new Profile();

// Get the index page
router.get('/', (req, res, next) => {
    let user = req.session.user;
    // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
    if (user) {
        res.redirect('/home');
        return;
    }
    res.render('index', { title: "My application" });
    //return res.json("Hello");
})

// Get home page
router.get('/home', (req, res, next) => {
    let user = req.session.user;

    if (user) {
        res.render('home', { opp: req.session.opp, name: user.fullname, id: user.id });
        return;
    }
    res.redirect('/');
});


// Post login data

router.post('/login', (req, res, next) => {
    user.login(req.body.email, req.body.password, function (result) {
        if (result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            //redirect the user to the home page.
            //return res.redirect('/home');
            //return res.json(result);
            const id = result.id;
            profile.find(id, function (x) {
                if (x == null){
                    return res.json(id);
                }
                return res.json(x);
            });
        } else {
            // if the login function returns null send this error message back to the user.
            res.send('a');
        }
    })
});

// Post register data
router.post('/register', (req, res, next) => {
    // prepare an object containing all user inputs.
    let userInput = {
        email: req.body.email,
        fullname: req.body.fullname,
        password: req.body.password
    };

    if (req.body.password == req.body.confirmPassword) {
        // call create function. to create a new user. if there is no error this function will return it's id.
        user.create(userInput, function (lastId) {
            // if the creation of the user goes well we should get an integer (id of the inserted user)
            if (lastId) {
                // Get the user data by it's id. and store it in a session.
                user.find(lastId, function (result) {
                    req.session.user = result;
                    req.session.opp = 0;
                    res.redirect('/home');
                });
            }
            else {
                console.log('Error creating a new user ...');
            }
        });
    }
    else {
        res.render('register');
    }
});

// Get loggout page
router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if (req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function () {
            res.redirect('/');
        });
    }
});

//link edit profile
router.get('/profile/:id', (req, res, next) => {
    // if(req.session.user) {
    //     // Get the user data by it's id. and store it in a session.
    //     profile.find(req.session.user.id, function(result) {
    //         req.session.profile = result;
    //         req.session.opp = 0;
    //         if (req.session.profile == undefined){
    //             res.render('edit');
    //         }
    //         return res.render('profile',{profile:req.session.profile});
    //     });
    // }

    const id = req.params.id;
    profile.find(id, function (result) {
        return res.json({
            statusCode: 200,
            status: true,
            result: {
                profile: result,
            }
        });
    });
});

//link edit profile
router.get('/edit', (req, res, next) => {
    res.render('edit');
    return;
});

// save edit profile
router.post('/save', (req, res, next) => {
    let user = req.session.user;

    let profileInput = {
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex,
        description: req.body.description,
        partner_sexual_type: req.body.partner_sexual_type,
        user_id: user.id
    };

    if (user) {
        if (req.session.user) {
            profile.find(req.session.user.id, function (result) {
                req.session.profile = result;
                req.session.opp = 0;
                if (req.session.profile == undefined) {
                    profile.create(profileInput)
                    // return res.render('profile');
                    res.redirect('/home');
                }
                else {
                    profile.update(req.body.name, req.body.age, req.body.sex, req.body.description, req.body.partner_sexual_type, user.id)
                    // return res.render('profile');
                    res.redirect('/home');
                }
            });
        }
    }
});

// router sang link dang ki
router.get('/dangki', (req, res, next) => {
    res.render('register');
    return;
});

// list user for match
router.get('/listUser', (req, res, next) => {
    // pool.query(`SELECT * FROM user where not user.id = ${req.session.user.id}`, function (err, result) {
    //     if (err) throw err;
    //     res.render('listUser', { users: result })
    // });

    pool.query(`SELECT * FROM profile where not profile.user_id = ${req.body.id}`, function (err, result) {
        if (err) throw err;
        return res.json(result);
    });
});

// list user for match
router.post('/match/:res_user_id', (req, res, next) => {
    pool.query(`INSERT INTO match_couple (status, req_user_id, res_user_id) VALUES 
    ('-1', '${req.session.user.id}', '${req.params.res_user_id}')`, function (err, result) {
        if (err) throw err;
        res.render('home')
    });
});

// list sending
router.get('/listSending', (req, res, next) => {
    pool.query(`Select * from 
                         match_couple 
                         join user 
                         on user.id=match_couple.res_user_id 
                         where match_couple.req_user_id = ${req.session.user.id}`, function (err, result) {
        if (err) throw err;
        res.render('listSending', { users: result })
    });
});

// list waiting
router.get('/listWaiting', (req, res, next) => {
    pool.query(`Select * from 
                         match_couple 
                         join user 
                         on user.id = match_couple.req_user_id 
                         where match_couple.res_user_id = ${req.session.user.id}`, function (err, result) {
        if (err) throw err;
        res.render('listWaiting', { users: result })
        //return res.json(result)
    });
});

// if accept
router.post('/accept/:req_user_id', (req, res, next) => {
    pool.query(`UPDATE match_couple SET status = '1' where 
    match_couple.res_user_id = ${req.session.user.id} 
    and match_couple.req_user_id = ${req.params.req_user_id}`)
    res.render('home')
});

// list friends
router.get('/listFriends', (req, res, next) => {
    pool.query(`Select * from 
                         match_couple 
                         join user 
                         on user.id = match_couple.req_user_id 
                         where match_couple.res_user_id = ${req.session.user.id} 
                         and  status = '1'`, function (err, result) {
        if (err) throw err;
        let friends = [];
        friends = [...result];
        pool.query(`Select * from 
                        match_couple 
                        join user 
                        on user.id = match_couple.res_user_id 
                        where match_couple.req_user_id = ${req.session.user.id} 
                        and  status = '1'`, function (err, result) {
            if (err) throw err;
            friends = [...friends,
            ...result];
            return res.render('listFriends', { users: friends })
        });
    });
});


// edit profile react
router.post('/edit_profile', (req, res, next) => {
    let profileInput = {
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex,
        description: req.body.description,
        partner_sexual_type: req.body.partner_sexual_type,
        user_id: req.body.user_id
    };

    profile.find(req.body.user_id, function (result) {
        if (result == undefined) {
            profile.create(profileInput)
        }
        else {
            profile.update(req.body.name, req.body.age, req.body.sex, req.body.description,req.body.partner_sexual_type, req.body.user_id)
        }
    });

});

// Post register data
router.post('/register_react', (req, res, next) => {

    let userInput = {
        email: req.body.email,
        fullname: req.body.fullname,
        password: req.body.password
    };

    var adr = req.body.email;

    user.find(adr, function (x) {
        if (x == null){
            if (req.body.password == req.body.confirmPassword) {
                // call create function. to create a new user. if there is no error this function will return it's id.
                user.create(userInput, function (lastId) {
                    // if the creation of the user goes well we should get an integer (id of the inserted user)
                    if (lastId) {
                        // Get the user data by it's id. and store it in a session.
                        user.find(lastId, function (result) {
                            return res.send('ok');
                        });
                    }
                    else {
                        return res.send('abc');
                    }
                });
            }
            else {
                 return res.send('Error');
            }
        }
        else {
            return res.send('User is valid');
        }
    });
});

module.exports = router;