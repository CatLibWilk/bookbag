const db = require("../models");
const axios = require("axios");

module.exports = {
    harvestResources: function(req, res) {
        console.log(`apiCallController reached.  Calling api for resouces matching: ${req.body.query}`);
        // axios.get(//here is the call for API//)
    }
    
};
