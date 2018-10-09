module.exports = function(sequelize, DataTypes) {
    var Note = sequelize.define("Note", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      
      body: {
        type: DataTypes.STRING,
        defaultValue: false
      }
    });

      Note.associate = function(models) {
        models.Note.belongsTo(models.Cluster, {
          foreignKey : {
            allowNull: false
          },
          onDelete: "cascade"
        });
        models.Note.belongsTo(models.Citation, {
          foreignKey : {
             allowNull: true
          },
          onDelete: "cascade"
        });
      };

   
    return Note;
  };


  