const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const verifyRole = require('../middleware/verifyRole');
const { addComment, allComments, deleteComment } = require('../controller/comment.controller');

const routes = express();

routes.post('/addComment/:id',verifyToken,verifyRole('Admin','User'),addComment)
routes.get('/allComment/:id',verifyToken,verifyRole('Admin','User'),allComments)
routes.delete('/deleteComment/:id',verifyToken,verifyRole('Admin','User'),deleteComment)

module.exports = routes;