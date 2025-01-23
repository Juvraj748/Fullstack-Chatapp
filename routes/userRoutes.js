const {Register, Login, SetAvatar, AllUsers} = require("../controllers/usersController")

const router = require("express").Router()

router.post("/register", Register);
router.post("/login", Login);
router.post("/setAvatar/:id", SetAvatar);

router.get("/all-users/:id", AllUsers);

module.exports = router;