const express = require("express");
const cors = require("cors");
const db = require("./db");
const Booking = require("./models/booking")(db, db.Sequelize.DataTypes);
const AWS = require("aws-sdk");

// Configure AWS SES
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

const app = express();
app.use(cors());
app.use(express.json());

// Sync DB
db.sync().then(() => {
  console.log("MySQL synced for booking-service");
});

// Create booking
app.post("/bookings", async (req, res) => {
  const booking = await Booking.create(req.body);

  // Send email
  const params = {
    Source: process.env.SES_EMAIL_SOURCE,
    Destination: {
      ToAddresses: [req.body.email],
    },
    Message: {
      Subject: {
        Data: "Booking Confirmation - WanderStay",
      },
      Body: {
        Text: {
          Data: `Your booking at ${req.body.hotelName} from ${req.body.checkIn} to ${req.body.checkOut} is confirmed!`,
        },
      },
    },
  };

  try {
    await ses.sendEmail(params).promise();
    console.log("Email sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
  }

  res.status(201).json(booking);
});

// Get all bookings
app.get("/bookings", async (req, res) => {
  const bookings = await Booking.findAll({ include: ["User", "Hotel"] });
  res.json(bookings);
});

// Get bookings by user
app.get("/bookings/user/:userId", async (req, res) => {
  const bookings = await Booking.findAll({
    where: { userId: req.params.userId },
    include: ["User", "Hotel"],
  });
  res.json(bookings);
});

app.listen(4002, () => console.log("Booking Service Running on Port 4002"));
