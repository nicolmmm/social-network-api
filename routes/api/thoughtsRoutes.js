const router = require("express").Router();
const {
  getThoughts,
  createThoughts,
  getThoughtsById,
  deleteThoughtsById,
  updateThoughtsById,
  addReactionToThought,
  deleteReaction,
} = require("../../controllers/thoughtsController");

// /api/courses
router.route("/").get(getThoughts).post(createThoughts);

// /api/courses/:courseId
router
  .route("/:_id")
  .get(getThoughtsById)
  .put(updateThoughtsById)
  .delete(deleteThoughtsById);

//thoughts reaction
router.route("/:_id/reactions/:reactionId").delete(deleteReaction);
router.route("/:_id/reactions").post(addReactionToThought);

module.exports = router;
