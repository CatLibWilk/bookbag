const db = require("../models");
const axios = require("axios");

module.exports = {
    harvestResources: function(req, res) {
        console.log(`apiCallController reached.  Calling api for resouces matching: ${req.body.query}`);
        console.log(typeof(req.body.query))
        const queryString = req.body.query.replace(/\s/g, '+');
        const query = `https://archive.org/advancedsearch.php?q=${queryString}&fl%5B%5D=creator&fl%5B%5D=date&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=5&page=1&output=json`
        console.log(query);
        axios.get(query)
              .then( result => {
                
                res.send(result.data)

              })
    }
    
};
