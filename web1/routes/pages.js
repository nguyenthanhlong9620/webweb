const express = require('express');
const Profile = require('../core/profile');
const User = require('../core/user');
const pool = require('../core/pool');
const Match = require('../core/match');
// const photo = require('../core/photo')
const { compareSync } = require('bcrypt');
const router = express.Router();
var mysql = require('mysql');
const Photo = require('../core/photo');

// create an object from the class User in the file core/user.js
const user = new User();
const profile = new Profile();
const match = new Match();
const photo = new Photo();

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
            req.session.user = result;
            req.session.opp = 1;
            const id = result.id;
            profile.find(id, function (x) {
                if (x == null){
                    return res.json(id);
                }
                return res.json(x);
            });
        } else {
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
        user.create(userInput, function (lastId) {
            if (lastId) {
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

// list user for match
router.post('/listUser', (req, res, next) => {
    pool.query(`SELECT * FROM profile where not profile.user_id = ${req.body.id}`, function (err, result) {
        if (err) throw err;
        return res.json(result);
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


// list sendingReact
router.post('/listSendingReact', (req, res, next) => {
    pool.query(`SELECT *from profile 
                       INNER JOIN photo ON profile.id = photo.profile_id
                       INNER JOIN match_couple ON profile.user_id = match_couple.res_user_id
                       where match_couple.req_user_id = ${req.body.id} 
                       and match_couple.status != '1'`, function (err, result) {
        if (err) throw err;
        return res.json(result);
    });

});

// list waitingReact
router.post('/listWaiting', (req, res, next) => {
    pool.query(`SELECT * from profile 
                        INNER JOIN photo ON profile.id = photo.profile_id
                        INNER JOIN match_couple ON profile.user_id = match_couple.req_user_id
                        where match_couple.res_user_id = ${req.body.id} 
                        and match_couple.status != '1'`, function (err, result) {
         if (err) throw err;
         return res.json(result);
    });
});

// if accept 
router.post('/acceptReact', (req, res, next) => {
    pool.query(`UPDATE match_couple SET status = '1' where 
    match_couple.res_user_id = ${req.body.userLogin_id}
    and match_couple.req_user_id = ${req.body.reqUser_id}`)
    return res.send('ok');
});

// list friends
router.post('/listFriendsReact', (req, res, next) => {
    pool.query(`SELECT * from profile 
                            INNER JOIN photo ON profile.id = photo.profile_id
                            INNER JOIN match_couple on profile.user_id = match_couple.req_user_id 
                            where match_couple.res_user_id = ${req.body.id} 
                            and status = '1'`, function (err, result) {
            if (err) throw err;
            let friends = [];
            friends = [...result];
            pool.query(`SELECT * from profile 
                            INNER JOIN photo ON profile.id = photo.profile_id
                            INNER JOIN match_couple on profile.user_id = match_couple.res_user_id 
                            where match_couple.req_user_id = ${req.body.id}  
                            and status = '1'`, function (err, result) {
                    if (err) throw err;
                    friends = [...friends,
                    ...result];
                    return res.json(friends);
        });
    });
});

// list user for match
router.post('/matchReact', (req, res, next) => {
    match.find(req.body.userLogin_id, req.body.resUser_id, function(result) {
        if (result == null){
            match.find(req.body.resUser_id,req.body.userLogin_id , function(result) {
                if (result == null){
                    pool.query(`INSERT INTO match_couple (status, req_user_id, res_user_id) VALUES 
                    ('-1', '${req.body.userLogin_id}', '${req.body.resUser_id}')`, function (err, result) {
                        if (err) throw err;
                        res.send('Matching oke')
                    });
                }
                else {
                    res.send('ERROR 1')
                }
            })
        }
        else {
            res.send('ERROR 2')
        }
    })
});

// photo profile 
router.post('/linkImage', (req, res, next) => {
    photo.find(req.body.profileId , function(result) {
        if (result == null){
            pool.query(`INSERT INTO photo (size, file_name, profile_id) VALUES 
            ('1', '${req.body.linkImage}', '${req.body.profileId}')`, function (err, result) {
                    if (err) throw err;
                    res.send('ok')
            }); 
        }
        else {
            pool.query(`DELETE FROM photo WHERE photo.profile_id = ${req.body.profileId}`)
             
            pool.query(`INSERT INTO photo (size, file_name, profile_id) VALUES 
                            ('1', '${req.body.linkImage}', '${req.body.profileId}')`, function (err, result) {
                    if (err) throw err;
                    res.send('ok')
            }); 

        }
    })  
});

// photo profile 
router.post('/listImage', (req, res, next) => {
    pool.query(`Select * from photo where photo.profile_id = ${req.body.profileId}`, function (err, result) {
        if (err) throw err;
        return res.json(result);
    });
});

// photo profile 
router.post('/profileId', (req, res, next) => {
    pool.query(`Select * from profile where profile.user_id = ${req.body.user_id}`, function (err, result) {
        if (err) throw err;
        return res.json(result);
    });
});

// cancel like
router.post('/cancel_like', (req, res, next) => {
    pool.query(`DELETE FROM match_couple WHERE match_couple.req_user_id = ${req.body.user_id}
               and match_couple.res_user_id = ${req.body.userResponse}`, function (err, result) {
        if (err) throw err;
        return res.send('ok')
    });
});

// cancel notification 
router.post('/cancel_notification', (req, res, next) => {
    pool.query(`DELETE FROM match_couple WHERE match_couple.res_user_id = ${req.body.user_id}
                and match_couple.req_user_id = ${req.body.userSending}`, function (err, result) {
        if (err) throw err;
        return res.send('ok')
    });
});

// cancel match 
router.post('/cancel_match', (req, res, next) => {
    pool.query(`DELETE FROM match_couple 
                WHERE match_couple.req_user_id = ${req.body.user_id}
                and match_couple.res_user_id = ${req.body.userSending}
                or match_couple.res_user_id = ${req.body.user_id} 
                and match_couple.req_user_id = ${req.body.userSending}`, function (err, result) {
        if (err) throw err;
        return res.send('ok')
    });
});

// image + infor
router.post('/testt', (req, res, next) => {
    pool.query(`Select *  FROM profile
                            join photo
                            on profile.id = photo.profile_id 
                            WHERE not profile.user_id = ${req.body.user_id} `, function (err, result) {
            if (err) throw err;
            return res.json(result)
    });
})

// details infor 
router.post('/details_Infor', (req, res, next) => {
    pool.query(`Select *  FROM profile
                            join photo
                            on profile.id = photo.profile_id 
                            WHERE profile.user_id = ${req.body.user_id} `, function (err, result) {
            if (err) throw err;
            return res.json(result)
    });
});

// Sending_report
router.post('/sending_report', (req, res, next) => {
    pool.query(`INSERT INTO report (req_user_id, content, reported_user_id) VALUES 
                            ('${req.body.user_id}', '${req.body.content}', '${req.body.reportedID}')`, function (err, result) {
                    if (err) throw err;
                    res.send('ok')
    }); 
});

// black list
router.post('/black_list', (req, res, next) => {
    pool.query(`INSERT INTO black_list (active_user_id, blocked_user_id) VALUES 
                            ('${req.body.user_id}', '${req.body.blockedUser}')`, function (err, result) {
                    if (err) throw err;
                    res.send('ok')
    }); 
});

// Upload imagePost
router.post('/uploadImage_Post', (req, res, next) => {
    pool.query(`INSERT INTO post (photo_name, content, user_id) VALUES 
                            ('${req.body.photo_name}', '${req.body.content}', '${req.body.user_id}')`, function (err, result) {
                    if (err) throw err;
                    res.send('ok')
    }); 
});

// return imagePost
router.post('/returnImage_Post', (req, res, next) => {
    pool.query(`Select *  FROM post where post.user_id = ${req.body.user_id}`, function (err, result) {
                    if (err) throw err;
                    return res.json(result);
    }); 
});

// return amount user
router.post('/amount_User', (req, res, next) => {
    pool.query(`Select *  FROM profile
                            join user
                            on profile.user_id = user.id `, function (err, result) {
        if (err) throw err;
        return res.json(result)
    });
});

// return list_matched
router.post('/amount_matched_couple', (req, res, next) => {
    pool.query(`Select *  FROM match_couple where match_couple.status = 1`, function (err, result) {
                    if (err) throw err;
                    return res.json(result);
    }); 
});


// return amount_reported
router.post('/amount_report', (req, res, next) => {
    pool.query(`Select *  FROM profile
                               join report
                               on profile.user_id = report.reported_user_id
                               `, function (err, result) {
        if (err) throw err;
        return res.json(result)
    });
});


// return black_list
router.post('/amount_blackList', (req, res, next) => {
    pool.query(`Select *  FROM black_list`, function (err, result) {
                    if (err) throw err;
                    return res.json(result);
    }); 
});

// post 
router.post('/list_post', (req, res, next) => {
    pool.query(`Select *  FROM post where post.user_id = ${req.body.user_id}
                      ORDER BY post.updatedAt DESC`, function (err, result) {
                    if (err) throw err;
                    return res.json(result);
    }); 
});

// all Post for admin page 
router.post('/all_post', (req, res, next) => {
    pool.query(`Select *  FROM post join profile
                          where post.user_id = profile.user_id
                          ORDER BY post.updatedAt DESC`, function (err, result) {
                    if (err) throw err;
                    return res.json(result);
    }); 
});

// delete post 
router.post('/delete_post', (req, res, next) => {
    pool.query(`DELETE FROM post where post.id_post = ${req.body.id_post}`, function (err, result) {
                    if (err) throw err;
                    return res.json("Oke");
    }); 
});

// update post 
router.post('/update_post', (req, res, next) => {
    pool.query(`update post set post.content = '${req.body.content}'
                            where post.id_post = ${req.body.id_post}`, function (err, result) {
                    if (err) throw err;
                    return res.json("Oke");
    }); 
});


// delete user from admin
router.post('/delete_user', (req, res, next) => {
    pool.query(`DELETE FROM user where user.id = ${req.body.id}`, function (err, result) {
        if (err) throw err;
        return res.json("Oke");
    }); 
});

// add matching from admin 
router.post('/add_matching', (req, res, next) => {
    pool.query(`INSERT INTO match_couple (req_user_id, res_user_id, status) 
                VALUES ('${req.body.req_user_id}', '${req.body.res_user_id}', '1')`, function (err, result) {
        if (err){
            return res.json("invalid user !!!");
        }
        return res.json("Oke");
    }); 
});

// delete matching from admin
router.post('/delete_matching', (req, res, next) => {
    pool.query(`DELETE FROM match_couple where match_couple.req_user_id = ${req.body.req_user_id}
                and match_couple.res_user_id = ${req.body.res_user_id}
                or match_couple.req_user_id = ${req.body.res_user_id}
                and match_couple.res_user_id = ${req.body.req_user_id}`, function (err, result) {
        if (err) throw err;
        return res.json("Oke");
    }); 
});

// delete report from admin
router.post('/delete_report', (req, res, next) => {
    pool.query(`DELETE FROM report where report.id = ${req.body.id}`, function (err, result) {
        if (err) throw err;
        return res.json("Oke");
    }); 
});

// all admin 
router.post('/all_admin', (req, res, next) => {
    pool.query(`SELECT * FROM admin`, function (err, result) {
        if (err) throw err;
        return res.json(result);
    }); 
});

// login_admin  
router.post('/login_admin', (req, res, next) => {
    pool.query(`SELECT * FROM admin where 
                admin.admin_name = '${req.body.admin_name}'`, function (err, result) {
        if (err) throw err;
        return res.json(result);
    }); 
});

module.exports = router;