module.exports = function(sequelize, DataTypes) {
    var Citation = sequelize.define("Citation", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
      title: {
        type: DataTypes.STRING,
        defaultValue: false
      },
      author: {
        type: DataTypes.STRING,
        defaultValue: false
      },
      url: {
        type: DataTypes.STRING,
        defaultValue: false
      },
      date: {
        type: DataTypes.INTEGER,
        defaultValue: false
      }
      
    });

    Citation.associate = function(models) {
      models.Citation.hasMany(models.Note);
      models.Citation.belongsTo(models.Cluster, {
        foreignKey: {
          allowNull: false
        },
        onDelete: "cascade"
      });
    };


    return Citation;
  };


  