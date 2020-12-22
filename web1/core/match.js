const pool = require('./pool');
const bcrypt = require('bcrypt');

function Match() {};

Match.prototype = {

    find : function(user_id, resUser_id, callback)
    {
        let sql = `Select * from 
                             match_couple 
                             join user 
                             on user.id = match_couple.req_user_id 
                             where match_couple.req_user_id = ${user_id}
                             and match_couple.res_user_id = ${resUser_id}`

        pool.query(sql, function(err, result) {
            if(err) throw err

            if(result.length) {
               return callback(result[0]);
            }else {
               return callback(null);
            }
        });
    },
}

module.exports = Match;