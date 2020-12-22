const pool = require('./pool');
const bcrypt = require('bcrypt');

function Photo() {};

Photo.prototype = {

    find : function(profile_id, callback)
    {
        let sql = `Select * from photo where photo.profile_id = ${profile_id}`

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

module.exports = Photo;