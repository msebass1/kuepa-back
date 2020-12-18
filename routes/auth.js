const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");

//ruta Login
router.post("/login", (req, res, next) => {
    passport.authenticate("local", function(err, user) {
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            return res.status(400).json({ errors: "no existe el usuario" });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({ success: user });
        });
    })(req, res, next);
});

//ruta registro
router.post("/registro", (req, res, next)=>{
  const newUser = new User(req.body.usuario);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
	if (err) res.status(500).send(err);
	newUser.password = hash;
        newUser.save()
	  .then((nusr)=>
	    res.send(nusr)
	)
	  .catch(err=>
	    res.status(500).send(err)
	  )
      })
    })
  })
module.exports = router;
