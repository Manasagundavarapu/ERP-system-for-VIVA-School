const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    resetPassowrdToken: String,
    resetPasswordExpires: Date,
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    dateofBirth: Date,
    nationality: String,
    religion: String,
    placeOfBirth: String,
    email: String,
    position: String,
    middleName: String,
    physicalAddress: String,
    postalAddress: String,
    dormitoryID: String,
    gender: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },
    status: String,
    fees: String,
    scholarship: String,
    telephone: String,
    mobilenumber: String,
    classID: String,
    guadian: [
      {
        id: String,
        relationship: String,
        occupation: String,
        name: String,
        email: String,
        mobile: String,
        address: String,
        lastname: String,
      },
    ],
    campusID: String,
    profileUrl: String,
    grade: String,
    lastSchool: {
      school: String,
      reason: String,
    },
    password: {
      type: String,
      required: true,
    },
    health: String,
    allege: String,
    disease: String,
    section: String,
    division: String,
    lastLogin: Date,
    past: {
      status: {
        type: Boolean,
      },
      date: Date,
      default: {
        status: false,
      },
    },
    withdraw: {
      type: Boolean,
      default: false,
    },
    withdrawDate: Date,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("students", StudentSchema, "accounts");
