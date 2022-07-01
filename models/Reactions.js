const { Schema, model, default: mongoose } = require("mongoose");

const reactionsSchema = new Schema({
  reactionId: {
    type: mongoose.Types.ObjectId,
  },

  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
    minLength: 1,
  },
  username: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    //get: formatDate,
  },
});

module.exports = reactionsSchema;
