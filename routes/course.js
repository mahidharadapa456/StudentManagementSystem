const express = require("express");
const { ObjectId } = require("mongodb");
const Course = require("../models/course");
const router = new express.Router();

// Course router

// * POST => creates new course
router.post("/create", async (req, res) => {
  console.log(req.body);
  let course = new Course(req.body);
  try {
    course = await course.save();
    res.redirect(`/course/getCourse/${course._id}`);
  } catch (error) {
    res.render("/newCourse", { course: course });
  }
});

// * GET => gets all courses from db
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses) return res.status("404").send("Course not found");
    // res.status("200").send(course)
    res.render("course", { courses });
  } catch (error) {
    res.redirect("/");
  }
});

// * GET => gets one document by its id
router.get("/getCourse/:id", async (req, res) => {
  const _id = req.params.id;
  const course = await Course.findOne({ _id: ObjectId(_id) });
  if (!course) return res.redirect("/");
  res.render("oneCourse", {
    courseName: course.courseName,
    courseCode: course.courseCode,
    courseType: course.courseType,
    courseDuration: course.courseDuration,
    courseDescription: course.courseDescription,
  });
});

// * GET => gets new course html
router.get("/new", (req, res) => {
  res.render("newCourse", {
    courseName: "",
    courseCode: "",
    courseType: "",
    courseDescription: "",
    courseDuration: "",
  });
});

// * GET => gets edit course html
router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const course = await Course.findById(id);
  const {
    _id,
    courseName,
    courseType,
    courseDuration,
    courseDescription,
    courseCode,
  } = course;
  res.render("editCourse", {
    _id,
    courseName,
    courseType,
    courseDuration,
    courseDescription,
    courseCode,
  });
});

// * DELETE => deletes targeted course by its id
router.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const course = await Course.findByIdAndDelete(_id);
    if (!course) return res.redirect("/course");
    res.redirect("/course");
  } catch (error) {
    res.send(error);
  }
});

// * PUT => updates course by its id
router.put("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    let course = await Course.findById(_id);
    if (!course) return res.redirect("/course");
    console.log(req.body);
    course.courseName = req.body.courseName;
    course.coursetype = req.body.courseType;
    course.courseDuration = req.body.courseDuration;
    course.courseCode = req.body.courseCode;
    course.courseDescription = req.body.courseDescription;

    await course.save();
    res.redirect(`/course/getCourse/${course._id}`);
  } catch (error) {
    res.redirect("/course");
  }
});

module.exports = router;
