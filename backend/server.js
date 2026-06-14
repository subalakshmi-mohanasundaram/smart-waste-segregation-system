const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const pickupRoutes = require("./routes/pickupRoutes");



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



// CONNECT DATABASE
connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/pickups", pickupRoutes);



app.get("/", (req, res) => {
  res.send("CI/CD Deployment Successful");
});

const PORT = process.env.PORT || 5000;
app.get("/api", (req, res) => {
  res.send("API is working");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
