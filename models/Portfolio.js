const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  softwaresUsed: [
    {
      type: String,
    },
  ],
  link: {
    type: String,
  },
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
