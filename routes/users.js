var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    local : {
        username: String,
        password: String
    },
    facebook: {
        id : String,
        token: String,
        name: String,
       email: String,
    }
});
 
 module.exports = mongoose.model('User', userSchema);
