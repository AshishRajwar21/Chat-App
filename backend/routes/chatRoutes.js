
const express = require("express");
const {protect} = require("../middleware/authorizemiddleware");
const { accessChat, fetchChats, createGroupChat, renameGroupChat, removeFromGroup, addToGroup } = require("../controllers/chatControllers");

const router = express.Router();

//route -> api/chat/

router.route("/").post(protect,accessChat);
router.route("/").get(protect,fetchChats);
router.route("/group").post(protect,createGroupChat);
router.route("/rename").put(protect,renameGroupChat);
router.route("/groupremove").put(protect,removeFromGroup);
router.route("/groupadd").put(protect,addToGroup);

module.exports = router;