module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: DataTypes.INTEGER,
    hotelId: DataTypes.INTEGER,
    roomId: DataTypes.STRING,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: "userId" });
    Booking.belongsTo(models.Hotel, { foreignKey: "hotelId" });
  };

  return Booking;
};
