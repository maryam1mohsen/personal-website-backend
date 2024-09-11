const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);

