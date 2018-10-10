const db = require("../models");

module.exports = {
    getClusters: function(req, res){
        console.log("get clusters in dbController reached, req.user info to follow")
        db.Cluster.findAll({
            where: {
                UserId: req.user.id
            }
        }).then(dbClusters => {
            console.log(dbClusters)
            res.json(dbClusters)
        });
    },

    getCluster: function(req, res) {
        console.log(`getting children of cluster ${req.params.id} in bdController for mainpage`);
        db.Citation.findOne({
            where: {
                ClusterId: req.params.id
            }
            //I think i need to either do an async call to both citations and notes, or somehow tell it to get all citations
            //assocated with a cluster AND all the notes associated with that citation
        }).then(dbCluster => {
            console.log(dbCluster)
            res.json(dbCluster)
        })
    }
};