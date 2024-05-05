
const express = require("express");
const {registerUser,authUser, allUsers} = require("../controllers/userControllers");
const {protect} = require("../middleware/authorizemiddleware");

const router = express.Router();

router.route('/').post(registerUser).get(protect,allUsers);   //localhost/api/user
router.post('/login',authUser); //localhost/api/user/login

//router.route('/').get(protect,allUsers);//first go through protect then allUsers

module.exports = router;


