const mongoose = require("mongoose");
const Mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        if (validator.isEmpty(v)) {
          throw new Error("Name cannot be empty");
        }
        return true;
      },
      message: "Name cannot be empty",
    },
  },
  surName: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        if (validator.isEmpty(v)) throw new Error();
        return true;
      },
      message: "Surname cannot be empty, please enter surname",
    },
  },
  gender: {
    type: String,
    required: true,
  },
  studentId: {
    type: Number,
    required: true,
  },
  courseId: {
    type: mongoose.Types.ObjectId,
  },
});

const Student = Mongoose.model("Student", studentSchema);

module.exports = Student;
