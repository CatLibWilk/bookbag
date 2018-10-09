const db = require("../models");

module.exports = {
    create: (req, res) => {
        console.log('call reached authcontroller')
        // console.log(req);
        db.User.find({
            where:{
                username: req.body.username
            }
        }).then(result => {
            if(result === null){
                console.log("new user");
                db.User.create(req.body)
                       .then(dbModel => res.json(dbModel))
                       .catch(err => res.status(422).json(err))
            }else{
                console.log("not new")
                res.send("already reg");
            }
        })
    }
}