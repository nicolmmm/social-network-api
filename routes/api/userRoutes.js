const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
  addUserFriend,
  DeleteUserFriendById,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router
  .route("/:_id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

//user friends
router
  .route("/:_id/friends/:friendId")
  .post(addUserFriend)
  .delete(DeleteUserFriendById);

module.exports = router;
