const pool = require('./pool');
const bcrypt = require('bcrypt');

function Profile() {};

Profile.prototype = {

    find : function(user_id, callback)
    {
        // prepare the sql query
        var field = 'user_id';

        let sql = `SELECT * FROM profile WHERE ${field} = ${user_id}`;

        pool.query(sql, function(err, result) {
            if(err) throw err

            if(result.length) {
               return callback(result[0]);
            }else {
               return callback(null);
            }
        });
    },

    create : function(body) 
    {
        // this array will contain the values of the fields.
        var bind = [];  
        for(prop in body){
            bind.push(body[prop]);
        }
        // prepare the sql query
        let sql = `INSERT INTO profile(name, age, sex, description, partner_sexual_type, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
        pool.query(sql, bind);
    },

    update: function(name, age, sex, des, pst, user_id)
    {
        let sql = `UPDATE profile SET name = '${name}', age = '${age}', sex = '${sex}', description = '${des}', 
        partner_sexual_type = '${pst}' where user_id = '${user_id}'`;
        pool.query(sql);
    }
}

module.exports = Profile;