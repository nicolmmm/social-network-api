// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { User, Thoughts } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => {
        const usersObj = {
          users,
        };
        return res.json(usersObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getUserById(req, res) {
    User.findOne({ _id: req.params._id })
      .select("-__v")
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).send({ message: "No user with that ID" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user by ID
  deleteUserById(req, res) {
    User.findOneAndRemove({ _id: req.params._id })
      .then((user) =>
        !user
          ? res.status(404).send("user not found")
          : res.status(200).send("user deleted")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Update user by ID
  updateUserById(req, res) {
    const filter = { _id: req.params._id };
    const update = req.body;
    User.findOneAndUpdate(filter, update, { new: true })
      .then((updatedUser) =>
        !updatedUser
          ? res.status(404).send("user not found")
          : res.status(200).json(updatedUser)
      )
      .catch((err) => res.status(500).send("something went from :S"));
  },

  addUserFriend(req, res) {
    const filter = { _id: req.params._id };
    const update = { friends: req.params.friendId };
    console.log(filter, update);
    User.findOneAndUpdate(filter, { $push: update }, { new: true })
      .select("-__v")
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).send({ message: "No user with that ID" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  DeleteUserFriendById(req, res) {
    const filter = { _id: req.params._id };
    const update = { friends: req.params.friendId };
    User.findOneAndUpdate(filter, { $pull: update }, { new: true })
      .then((user) =>
        !user
          ? res.status(404).send("user not found")
          : res.status(200).send("friend removed")
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
