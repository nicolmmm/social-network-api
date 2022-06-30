const { Schema, model } = require("mongoose");

console.log("test1");

const thoughtsSchema = require("./Thoughts");
//import thoughtsSchema from "./Thoughts.js";

console.log("test2");
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },

  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "thoughts",
    },
  ],

  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return `${this.friends.length}`;
  });

const User = model("user", userSchema);

module.exports = User;
