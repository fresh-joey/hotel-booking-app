module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define("Hotel", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
  });

  return Hotel;
};
