const mongoose = require("mongoose");
const validator = require("validator");
const  Mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseType: { type: String, min: 5, max: 25, required: true },
  courseName: {
    type: String,
    min: 10,
    required: true,
    validate: {
      validator: (v) => {
        if (validator.isEmpty(v))
          throw new Error("Course name can not be empty");
        return true;
      },
      message: "Course name can not be empty!",
    },
  },
  courseDescription: {
    type: String,
    min: [10, "Description words must be at least "],
    max: 150,
  },
  courseCode: {
    type: String,
    required: true,
  },
  courseDuration: {
    type: String,
    required: true,
  },
});

const Course = Mongoose.model("Course", courseSchema);

module.exports = Course;
