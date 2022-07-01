const { Schema, model } = require("mongoose");
const reactionsSchema = require("./Reactions");

const thoughtsSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
    minLength: 1,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    //get: formatDate,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionsSchema],
});

thoughtsSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  });

const Thoughts = model("thoughts", thoughtsSchema);

module.exports = Thoughts;
