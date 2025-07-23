const express = require("express");
const cors = require("cors");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const db = require("./db");
const Hotel = require("./models/hotel")(db, db.Sequelize.DataTypes);

// Configure AWS
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `hotels/${Date.now()}_${file.originalname}`);
    },
  }),
});

const app = express();
app.use(cors());
app.use(express.json());

// Sync DB
db.sync().then(() => {
  console.log("MySQL synced for hotel-service");
});

// Upload image
app.post("/upload-image", upload.single("image"), (req, res) => {
  res.json({ imageUrl: req.file.location });
});

// Get all hotels
app.get("/hotels", async (req, res) => {
  const hotels = await Hotel.findAll();
  res.json(hotels);
});

// Get hotel by ID
app.get("/hotels/:id", async (req, res) => {
  const hotel = await Hotel.findByPk(req.params.id);
  if (!hotel) return res.status(404).json({ error: "Hotel not found" });
  res.json(hotel);
});

// Create hotel
app.post("/hotels", async (req, res) => {
  const { name, location, price, description, image } = req.body;
  const hotel = await Hotel.create({
    name,
    location,
    price,
    description,
    image,
  });
  res.status(201).json(hotel);
});

// Update hotel
app.put("/hotels/:id", async (req, res) => {
  const { name, location, price, description, image } = req.body;
  const hotel = await Hotel.findByPk(req.params.id);
  if (!hotel) return res.status(404).json({ error: "Hotel not found" });
  hotel.name = name;
  hotel.location = location;
  hotel.price = price;
  hotel.description = description;
  hotel.image = image;
  await hotel.save();
  res.json(hotel);
});

// Delete hotel
app.delete("/hotels/:id", async (req, res) => {
  const hotel = await Hotel.findByPk(req.params.id);
  if (!hotel) return res.status(404).json({ error: "Hotel not found" });
  await hotel.destroy();
  res.json({ message: "Hotel deleted" });
});

app.listen(4001, () => console.log("Hotel Service Running on Port 4001"));
