module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hotelId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rating: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 5 },
    },
    comment: DataTypes.TEXT,
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: "userId" });
    Review.belongsTo(models.Hotel, { foreignKey: "hotelId" });
  };

  return Review;
};
