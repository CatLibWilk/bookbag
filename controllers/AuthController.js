const db = require("../models");
const passport = require("passport")

module.exports = {
    create: (req, res) => {


        db.User.find({
            where:{
                username: req.body.username
            }
        }).then(result => {
            if(result === null){

                db.User.create(req.body)
                       .then(dbModel => res.json(dbModel))
                       .catch(err => res.status(422).json(err))
            }else{

                res.send("already reg");
            }
        })
    },
    login: (req, res) => {

        passport.authenticate('local-signup', { successRedirect: '/homepage',
        failureRedirect: '/',
        failureFlash: true })
        
    }
}