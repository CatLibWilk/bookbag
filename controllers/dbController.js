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

    getClusterData: function(req, res) {
        console.log(`getting children of cluster ${req.params.id} in bdController for mainpage`);
        const citationPromise = db.Citation.findAll({
            where: {
                ClusterId: req.params.id
            }
        });
        const notesPromise = db.Note.findAll({
            where: {
                ClusterId: req.params.id
            }
        });

        Promise.all([citationPromise, notesPromise])
                .then((citationData, notesData) => {
                    res.json({
                        citations: citationData,
                        notes: notesData
                    });
                });
    }      
    
};

// var citationPromise = db.Citation...

// var notesPromise = db.Notes....


// Promise.all(citationPromise, notesPromise)
// .then(citationData, notesData) {
//     res.json({
//         citation: citationData,
//         notes: notesData
//     })
// }