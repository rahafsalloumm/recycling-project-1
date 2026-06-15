const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// =======================
// REGISTER
// =======================
const register = async (req, res) => {
    try {

        const { name, email, phone, password, confirmPassword, role } = req.body;

        // check passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // =========================
        // NEW LOGIC (PROFESSIONAL FLOW)
        // =========================
        let status = "incomplete";

        const user = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            role,
            status
        });

        await user.save();

        return res.status(201).json({
            message: "User created successfully",
            userId: user._id,
            nextStep: "complete-profile"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};


// =======================
// LOGIN
// =======================
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findById({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // banned check
        if (user.isBanned) {
            return res.status(403).json({
                message: "Account is banned"
            });
        }

        // status check (IMPORTANT FLOW)
        if (user.status === "incomplete") {
            return res.status(403).json({
                message: "Please complete your profile first"
            });
        }

        if (user.status === "pending") {
            return res.status(403).json({
                message: "Account waiting for admin approval"
            });
        }

        if (user.status === "rejected") {
            return res.status(403).json({
                message: "Account rejected"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};


// =======================
// LOGOUT
// =======================
const logout = (req, res) => {
    return res.status(200).json({
        message: "Logged out successfully"
    });
};


module.exports = {
    register,
    login,
    logout
};