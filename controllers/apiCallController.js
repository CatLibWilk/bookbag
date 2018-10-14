const db = require("../models");

module.exports = {
    harvestResources: function(req, res) {
        console.log(`apiCallController reached.  Calling api for resouces matching: ${req.body.query}`)
    }
    
};
