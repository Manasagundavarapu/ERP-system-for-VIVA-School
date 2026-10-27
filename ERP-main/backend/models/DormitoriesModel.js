const mongoose = require("mongoose");

const DormitoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    campus: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("dormitories", DormitoriesSchema);
