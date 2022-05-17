const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Course = require("../models/course");


// * GET => gets html of all Students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    if (!students) return res.send("Students not found");
    let studentsList = students.map(async (student) => {
      try {
        const course = await Course.findOne({ _id: student.courseId });
        return { student, course };
      } catch (error) {
        return error;
      }
    });
    studentsList = await Promise.all(studentsList);
    res.render("student/students", { studentsList });
  } catch (error) {
    console.log(error);
  }
});

// * GET => get html of student form
router.get("/new", async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses) return res.send("Courses not found");
    res.render("student/newStudent", { student: new Student(), courses });
  } catch (error) {
    console.log(error);
  }
});

// * GET => gets html of edit form
router.get("/edit/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const student = await Student.findById(_id);
    if (!student) return res.send("Edit student not found");
    const courses = await Course.find();
    res.render("student/editStudent", { student, courses });
  } catch (error) {
    res.redirect("/students");
  }
});

// * GET => get student by id
router.get("/getStudent/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findOne({ _id: id });
    if (!student) return res.redirect("/students");
    const appliedCourse = await Course.findOne({ _id: student.courseId });
    if (!appliedCourse) return res.send("Cannot get course, check courseId");
    res.render("student/show", { student, appliedCourse });
  } catch (error) {
    res.redirect("/students");
  }
});

// * POST => creates new student
router.post("/create", async (req, res) => {
  let student = new Student(req.body);
  try {
    student = await student.save();
    res.redirect(`/students/getStudent/${student._id}`);
  } catch (error) {
    res.redirect('/student/new', 404);
  }
});

// * PUT => updates student
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let student = await Student.findById(id);
    if (!student) return res.send("Edited student not found");
    student.name = req.body.name;
    student.surName = req.body.surName;
    student.gender = req.body.gender;
    student.studentId = req.body.studentId;
    student.courseId = req.body.courseId;
    student = await student.save();
    res.redirect(`/students/getStudent/${student._id}`);
  } catch (error) {
    res.redirect("/students");
  }
});

// * DELETE -> deletes student record
router.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  await Student.findByIdAndDelete(_id);
  res.redirect("/students");
});

module.exports = router;