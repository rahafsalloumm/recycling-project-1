require("dotenv").config();

const express = require("express");

const connectToDb = require("./config/connectToDb");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();


// =======================
// MIDDLEWARE (IMPORTANT ORDER)
// =======================
app.use(express.json());


// =======================
// ROUTES
// =======================
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);


// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {

        await connectToDb();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {

        console.error("Database connection failed");

        process.exit(1);
    }
};

startServer();