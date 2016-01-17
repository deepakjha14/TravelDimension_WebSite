var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var fbAuth = require('./fbAuth.js');
var User = require('../routes/users.js');

passport.serializeUser(function(user, done) {
    console.log('I am serializeUser***');
   done(null, user);
 });
 
 passport.deserializeUser(function(obj, done) {
    console.log('I am de-serializeUser***');
   done(null, obj);
 });

passport.use(new FacebookStrategy({
    clientID: fbAuth.facebookAuth.clientID,
    clientSecret: fbAuth.facebookAuth.clientSecret,
    callbackURL: fbAuth.facebookAuth.callback,
    profileFields: ['id', 'displayName', 'photos', 'emails']
},
  function (accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //  return done(err, user);
    //});
    console.log(JSON.stringify(profile)+' This is the profile that is returned with emails. ');
    process.nextTick(function () {
        User.findOne({ 'facebook.id': profile.id }, function (err, user) {            
            if (err){
                console.log('In error :--' +err);
                return done(err);
            }
            if (user){
                console.log('User exists :--' + user);
                return done(null, user);
            }
            else {
                console.log('******** new user save method ***********');
                var newUser = new User();
                newUser.facebook.id = profile.id;
                newUser.facebook.email = profile.emails[0].value; 
                newUser.token = accessToken;               

                newUser.save(function (err) { 
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        })
    });
}
));

module.exports = passport;