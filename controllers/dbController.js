const db = require("../models");

module.exports = {
    getClusters: function(req, res){

        db.Cluster.findAll({
            where: {
                UserId: req.user.id
            }
        }).then(dbClusters => {
            res.json(dbClusters)
        });
    },

    deleteCluster: function(req, res) {

        db.Cluster.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.json(result);
        })
    },
    
    createCluster: function(req, res) {

         db.Cluster.create({
             title: req.params.name,
             UserId: req.user.id
            })
                    .then(response => {
                        res.json(response);
                    });
    },

    getClusterData: function(req, res) {

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
                    res.json({
                        returnedData
                    });
                });
    },
    
    deleteNote: function (req, res) {


        db.Note.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                res.json(result);
            });
    },
    
    createNote: function (req, res) {

        let newNote = {};

        if(req.body.citId){
            newNote = {
                body: req.body.body,
                ClusterId: req.body.clusId,
                CitationId: req.body.citId,
                UserId: req.user.id
            }
            
            db.Note.create(
                newNote
            ).then(result => {
                res.json(result);
            });


        }else{
            newNote = {
                body: req.body.body,
                ClusterId: req.body.clusId,
                UserId: req.user.id
            }

            db.Note.create(
                newNote
            ).then(result => {
                res.json(result);
            });
        }
    },

    getNote: function(req, res) {

        db.Note.findOne({
            where: {
                id: req.params.id
            }
        })
          .then(result => {
              res.json(result)
          });
    },

    editNote: function(req, res) {
        db.Note.update({
            body: req.body.body,
            },{
                where: {
                    id: req.params.id
                }
            }
        ).then(response => {
            res.json(response);
        });
        
    },

    deleteCitation: function (req, res) {


        db.Note.destroy({
            where: {
                CitationId: req.params.id
            }
        }).then(result => {
            db.Citation.destroy({
                where: {
                    id: req.params.id
                }
        }).then(result => {
                res.json(result)
            });
        });
    },

    createCitation: function (req, res) {

        db.Citation.create(req.body)
                    .then(response => {
                        res.json(response)
                    });
        
    },


    getCitation: function(req, res) {

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
