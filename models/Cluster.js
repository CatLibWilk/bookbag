module.exports = function(sequelize, DataTypes) {
    var Cluster = sequelize.define("Cluster", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        defaultValue: false
      }
      
    });

    Cluster.associate = function(models) {
      models.Cluster.hasMany(models.Note);
      models.Cluster.hasMany(models.Citation);
      models.Cluster.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
        onDelete: "cascade"
      });
    };


    return Cluster;
  };


  