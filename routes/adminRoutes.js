const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    approveUser,
    banUser,
    unbanUser,
    getAllUsers,
    getPendingUsers
} = require("../controllers/adminController");

const router = express.Router();


// dashboard
router.get(
    "/dashboard",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {
        return res.status(200).json({
            message: "Welcome Admin"
        });
    }
);


// approve user
router.put(
    "/approve/:userId",
    authMiddleware,
    roleMiddleware("admin"),
    approveUser
);


// ban user
router.put(
    "/ban/:userId",
    authMiddleware,
    roleMiddleware("admin"),
    banUser
);


// unban user
router.put(
    "/unban/:userId",
    authMiddleware,
    roleMiddleware("admin"),
    unbanUser
);


// get all users
router.get(
    "/users",
    authMiddleware,
    roleMiddleware("admin"),
    getAllUsers
);

router.get(
    "/pending-users",
    authMiddleware,
    roleMiddleware("admin"),
    getPendingUsers
);

module.exports = router;