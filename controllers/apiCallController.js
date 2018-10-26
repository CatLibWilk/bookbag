const db = require("../models");
const axios = require("axios");

module.exports = {
    harvestResources: function(req, res) {


        const queryString = req.body.query.replace(/\s/g, '+');
        // const query = `http://openlibrary.org/subjects/${queryString}.json?limit=100`
        const query = `http://openlibrary.org/search.json?title=${queryString}`

        axios.get(query)
              .then( result => {

                res.send(result.data)

              })
    }
    
};

