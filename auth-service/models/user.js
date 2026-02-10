module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    googleId: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: DataTypes.STRING,
  });

  return User;
};
