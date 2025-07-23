const express = require("express");
const cors = require("cors");
const db = require("./db");
const User = require("./models/user")(db, db.Sequelize.DataTypes);

const app = express();
app.use(cors());
app.use(express.json());

// Sync DB
db.sync().then(() => {
  console.log("MySQL synced for user-service");
});

// Get all users
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Get user by ID
app.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// Create user
app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// Update user
app.put("/users/:id", async (req, res) => {
  const { name, email, bio, avatar, role } = req.body;
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.name = name;
  user.email = email;
  user.bio = bio;
  user.avatar = avatar;
  user.role = role;
  await user.save();
  res.json(user);
});

// Delete user
app.delete("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  await user.destroy();
  res.json({ message: "User deleted" });
});

app.listen(4003, () => console.log("User Service Running on Port 4003"));
