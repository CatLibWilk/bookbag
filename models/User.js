module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: false
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active"
      },
    });

    User.associate = function(models) {
      models.User.hasMany(models.Note);
      models.User.hasMany(models.Citation);
    };

    
    return User;
  };