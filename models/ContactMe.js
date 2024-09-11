const mongoose = require('mongoose');

const ContactMeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  inquiry: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('ContactMe', ContactMeSchema);
