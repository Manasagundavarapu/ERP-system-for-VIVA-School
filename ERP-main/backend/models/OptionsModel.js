const mongoose = require("mongoose");

const OptionsModel = new mongoose.Schema(
  {
    events: {
      type: [
        {
          type: String,
        },
      ],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("optionsdata", OptionsModel);
