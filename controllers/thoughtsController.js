// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { Thoughts, User } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then(async (thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thoughts found" })
          : res.status(200).json(thoughts)
      )
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  // Get a single student
  getThoughtsById(req, res) {
    Thoughts.findOne({ _id: req.params._id })
      .select("-__v")
      .lean()
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        return res.status(500).json(err);
      });
  },

  // create a new thought
  createThoughts(req, res) {
    Thoughts.create(req.body)
      .then((thought) => {
        const filter = { username: req.body.username };
        const update = { thoughts: thought._id };
        //appending thought _id to user
        User.findOneAndUpdate(filter, { $push: update }, { new: true });
        res.status(200).json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought and remove them from the course
  deleteThoughtsById(req, res) {
    Thoughts.findOneAndRemove({ _id: req.params._id })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found matching that ID" })
          : res.status(200).json({ removed: thought })
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  //update a thought
  updateThoughtsById(req, res) {
    const filter = { _id: req.params._id };
    const update = req.body;
    Thoughts.findOneAndUpdate(filter, update, { new: true })
      .then((thought) =>
        !thought
          ? res.status(404).send("thought not found")
          : res.status(200).json({ updated: thought })
      )
      .catch((err) => res.status(500).send("something went wrong :S"));
  },

  // Add an assignment to a student
  addAssignment(req, res) {
    console.log("You are adding an assignment");
    console.log(req.body);
    Student.findOneAndUpdate(
      { _id: req.params.studentId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((student) =>
        !student
          ? res
              .status(404)
              .json({ message: "No student found with that ID :(" })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a student
  removeAssignment(req, res) {
    Student.findOneAndUpdate(
      { _id: req.params.studentId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((student) =>
        !student
          ? res
              .status(404)
              .json({ message: "No student found with that ID :(" })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },
};
