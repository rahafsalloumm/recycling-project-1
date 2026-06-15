const User = require("../models/User");


// approve user
const approveUser = async (req, res) => {
    try {

        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.status = "active";

        await user.save();

        return res.status(200).json({
            message: "User approved successfully"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Server error"
        });
    }
};
const banUser = async (req, res) => {
    try {

        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.isBanned = true;

        await user.save();

        return res.status(200).json({
            message: "User banned successfully"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Server error"
        });
    }
};


const unbanUser = async (req, res) => {
    try {

        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.isBanned = false;

        await user.save();

        return res.status(200).json({
            message: "User unbanned successfully"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Server error"
        });
    }
};

const getAllUsers = async (req, res) => {
    try {

        const users = await User.find().select("-password");

        return res.status(200).json(users);

    } catch (error) {

        return res.status(500).json({
            message: "Server error"
        });
    }
};
const getPendingUsers = async (req, res) => {
    try {

        const users = await User.find({
            status: "pending"
        }).select("-password");

        return res.status(200).json(users);

    } catch (error) {

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    approveUser,
    banUser,
    unbanUser,
    getAllUsers,
    getPendingUsers
};;