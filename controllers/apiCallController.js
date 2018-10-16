const db = require("../models");
const axios = require("axios");

module.exports = {
    harvestResources: function(req, res) {
        console.log(`apiCallController reached.  Calling api for resouces matching: ${req.body.query}`);
        console.log(typeof(req.body.query))
        const queryString = req.body.query.replace(/\s/g, '+');
        // const query = `http://openlibrary.org/subjects/${queryString}.json?limit=100`
        const query = `http://openlibrary.org/search.json?title=${queryString}`
        console.log(query);
        axios.get(query)
              .then( result => {
                console.log(result)
                res.send(result.data)

              })
    }
    
};

