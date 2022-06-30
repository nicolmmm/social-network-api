const router = require("express").Router();
const {
  getThoughts,
  createThoughts,
  getThoughtsById,
  deleteThoughtsById,
  updateThoughtsById,
} = require("../../controllers/thoughtsController");

// /api/courses
router.route("/").get(getThoughts).post(createThoughts);

// /api/courses/:courseId
router
  .route("/:_id")
  .get(getThoughtsById)
  .put(updateThoughtsById)
  .delete(deleteThoughtsById);

module.exports = router;
