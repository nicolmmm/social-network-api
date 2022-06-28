const { Schema, model } = require("mongoose");
const thoughtsSchema = require("Thoughts");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    Trimmed: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
  },

  thoughts: [thoughtsSchema],
  //self referencing. should contain an array of `_id` referencing user
  friends: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return `${this.friends.length}`;
  });

const User = model("user", userSchema);

console.log(User);

module.exports = User;
