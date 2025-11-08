const express = require('express')
const imageUpload = require('../middleware/imageUpload');
const { registerUser, loginUser } = require('../controller/user.controller');

const routes = express();

routes.post('/registerUser',imageUpload.single('profile'),registerUser)
routes.post('/loginUser',loginUser)

module.exports = routes;