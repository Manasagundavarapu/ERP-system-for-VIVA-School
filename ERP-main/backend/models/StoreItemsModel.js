const mongoose = require("mongoose");

const StoreitemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    unit: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("storeitems", StoreitemsSchema);
