const express = require("express");
const bcrypt = require("bcrypt")
const router = express.Router();


// * MODELS
const Student = require("../models/student");
const Course = require("../models/course");
const User = require('../models/user')

// * MIDDLEWARE
const auth = require('../middleware/auth')


//* UTILS
const generateToken = require('../utils/generateToken')

//Main dashboard
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        if (!students) return res.send("Students not found");
        const courses = await Course.find();
        if (!courses) return res.send("Courses not found");
        res.render("index", {students, courses});
    } catch (error) {
        res.send("internal server error");
    }
});

//* SIGN UP HTML
router.get('/signUp', (req, res) => {
    res.render('users/signUp')
})

//* SIGN UP
router.post('/signUp', async (req, res,) => {
    const { password } = req.body;
    //* HASHING PASSWORD
    const hashPassword = await bcrypt.hash(password, 10)
    req.body.password = hashPassword
    const user = new User(req.body);
    try {
        const duplicateUser = await User.findOne({email: req.body.email})
        console.log(duplicateUser)
        if(duplicateUser) return res.status(409).json({message: "Error, user already exists", ok: false})
        if (!user) return console.log('Error while creating user');
        await user.save();
        res.status(201).json({message: 'Success', user, ok: true})
    } catch (err) {
        res.status(400).json("Bad request while creating user")
    }
})

router.get("/signIn", (req, res) => {
    res.render("users/signin")
})

// * SIGN IN
router.post('/signIn', async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email: email})
        if(!user) return console.log('User not found')
        const isMatchPassword = await bcrypt.compare(password, user.password)
        if(!isMatchPassword) {
            return res.status(500).send({message: "Password does not match", ok: false})
        }
        const token = await generateToken(user);
        res.send({token, user, ok: true})
    } catch (e) {
        res.status(500).send({message: e})
    }
})

module.exports = router;