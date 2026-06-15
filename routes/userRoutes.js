const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");


// =======================
// GET MY PROFILE
// =======================
router.get(
    "/me",
    authMiddleware,
    async (req, res) => {
        try {

            const user = await User.findById(req.user.id).select("-password");

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            return res.status(200).json({
                user
            });

        } catch (error) {
            return res.status(500).json({
                message: "Server error"
            });
        }
    }
);


// =======================
// UPDATE MY PROFILE
// =======================
router.put(
    "/me",
    authMiddleware,
    async (req, res) => {
        try {

            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const { name, email } = req.body;

            if (name) user.name = name;
            if (email) user.email = email;

            await user.save();

            return res.status(200).json({
                message: "Profile updated successfully",
                user
            });

        } catch (error) {
            return res.status(500).json({
                message: "Server error"
            });
        }
    }
);

module.exports = router;