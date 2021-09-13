const fs = require('fs');
const path = require('path');
const pasJwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//const User = require('mssql');

const pathToKey = path.join(__dirname,'..','id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey,'utf8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

const strategy = new JwtStrategy(options, (payload,done) => {
});

module.exports = (passport) => {
    passport.use(strategy);
}