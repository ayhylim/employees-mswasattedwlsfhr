const express = require("express");
const router = express.Router();

const {login, register, dashboard, getAllUsers} = require("../controllers/user");
const authMiddleware = require("../middleware/auth");

router.route("/login").post(login);
router.route("/register").post(register);

// contoh hanya bisa diakses oleh purchasing dan marketing
router.route("/dashboard").post(dashboard)

// hanya admin atau purchasing bisa lihat semua user
router.route("/users").post(getAllUsers)

module.exports = router;
