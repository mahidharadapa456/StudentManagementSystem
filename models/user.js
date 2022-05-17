const mongoose = require('mongoose');
const Mongoose = require('mongoose');
const validator = require('validator')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        min: 3,
        required: true,
        validate: {
            validator: (value) => {
                if (validator.isEmpty(value)) {
                    throw new Error('Username cannot be empty')
                }
                return true
            }
        }

    },
    password: {
        type: String,
        min: 3,
        max: 15,
        required: true
    },
    email: {
        type: String,
        min: 3,
        required: true,
        validate: {
            validator: (value) => {
                if(!validator.isEmail(value)){
                    throw new Error("Invalid email")
                }
                return true;
            },
            _message: 'Invalid email'
        }
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
})

const User = Mongoose.model('User', userSchema);

module.exports = User;