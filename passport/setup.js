const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//importacion del modulo de passport para iniciar sesion con usuario y constraseña
const User = require("../models/Users");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Local Strategy
passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        // Si el usuario no existe
        User.findOne({ email: email })
            .then(user => {
                // Si no existe el usuario
                if (!user) {
		  return done(null, false, {message: "varifica las credenciales"})
                } else {
                    // comparacion de los hash para la contraseña
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Wrong password" });
                        }
                    });
                }
            })
	    // por si hay algun error con la conexion a mongo
            .catch(err => {
                return done(null, false, { message: err });
            });
    })
);

module.exports = passport;
