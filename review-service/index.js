const express = require("express");
const cors = require("cors");
const db = require("./db");
const Review = require("./models/review")(db, db.Sequelize.DataTypes);

const app = express();
app.use(cors());
app.use(express.json());

// Sync DB
db.sync().then(() => {
  console.log("MySQL synced for review-service");
});

// Get all reviews
app.get("/reviews", async (req, res) => {
  const reviews = await Review.findAll({ include: ["User", "Hotel"] });
  res.json(reviews);
});

// Get reviews by hotel
app.get("/reviews/hotel/:hotelId", async (req, res) => {
  const reviews = await Review.findAll({
    where: { hotelId: req.params.hotelId },
    include: ["User", "Hotel"],
  });
  res.json(reviews);
});

// Get review by ID
app.get("/reviews/:id", async (req, res) => {
  const review = await Review.findByPk(req.params.id, {
    include: ["User", "Hotel"],
  });
  if (!review) return res.status(404).json({ error: "Review not found" });
  res.json(review);
});

// Create review
app.post("/reviews", async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json(review);
});

// Update review
app.put("/reviews/:id", async (req, res) => {
  const { hotelId, userId, rating, comment } = req.body;
  const review = await Review.findByPk(req.params.id);
  if (!review) return res.status(404).json({ error: "Review not found" });
  review.hotelId = hotelId;
  review.userId = userId;
  review.rating = rating;
  review.comment = comment;
  await review.save();
  res.json(review);
});

// Delete review
app.delete("/reviews/:id", async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  if (!review) return res.status(404).json({ error: "Review not found" });
  await review.destroy();
  res.json({ message: "Review deleted" });
});

app.listen(4004, () => console.log("Review Service Running on Port 4004"));
