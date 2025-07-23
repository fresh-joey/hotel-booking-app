module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    bio: DataTypes.TEXT,
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Booking, { foreignKey: "userId" });
  };

  return User;
};
