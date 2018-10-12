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

    deleteCluster: function(req, res) {
        console.log(`delete cluster reached in controller, prepare to delete cluster with id = ${req.params.id}`)
        db.Cluster.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            console.log(result);
            res.json(result);
        })
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
                .then((returnedData) => {
                    console.log(returnedData)
                    res.json({
                        returnedData
                    });
                });
    },
    
    deleteNote: function (req, res) {
        console.log("deletenote reached in dbController");
        console.log(`preparing to delete note with id = ${req.params.id}`)
        db.Note.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                res.json(result);
            });
    },

    deleteCitation: function (req, res) {
        console.log("deletenote reached in dbController");
        console.log(`preparing to delete citation with id = ${req.params.id}`)
        db.Citation.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.json(result);
        });
    },

    getNote: function(req, res) {
        console.log(`reached controller and retrieving data for note ${req.params.id}`)
        db.Note.findOne({
            where: {
                id: req.params.id
            }
        })
          .then(result => {
              res.json(result)
          });
    },

    getCitation: function(req, res) {
        console.log(`reached controller and retrieving data for citation ${req.params.id}`)
        db.Citation.findOne({
            where: {
                id: req.params.id
            }
        })
          .then(result => {
              res.json(result)
          });
    }
    
};
