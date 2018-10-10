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
        console.log(`getting cluster ${req.params.id} in bdController for mainpage`);
        db.Cluster.findOne({
            where: {
                id: req.params.id
            }
        }).then(dbCluster => {
            console.log(dbCluster)
            res.json(dbCluster)
        })
    }
};