const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = async (req, res, next) => {
    const authToken = req.headers['authorization']?.replace('Bearer ', '')
    if(authToken == null) return res.sendStatus(401);
    jwt.verify(authToken, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403)
        req.user = decoded
        next()
    })
}

module.exports = auth;