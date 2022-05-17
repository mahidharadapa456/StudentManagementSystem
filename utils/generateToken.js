require('dotenv').config()
const jwt = require("jsonwebtoken")


const generateToken = async(user) => {
    const encoded = jwt.sign({_id: user._id}, process.env.JWT_TOKEN_SECRET, { expiresIn: '1 day' });
    return encoded;
}

module.exports = generateToken;