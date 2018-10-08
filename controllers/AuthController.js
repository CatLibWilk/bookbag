const db = require("../models");

module.exports = {
    create: (req, res) => {
        console.log('call reached authcontroller')
        console.log(req);
        db.User.create(req.body)
               .then(dbModel => res.json(dbModel))
               .catch(err => res.status(422).json(err))
    }
}