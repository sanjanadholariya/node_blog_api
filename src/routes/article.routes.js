const express = require('express')
const imageUpload = require('../middleware/imageUpload');
const verifyToken = require('../middleware/verifyToken')
const verifyRole = require('../middleware/verifyRole');
const { addArticle, allArticle, deleteArticle, editArticle } = require('../controller/article.controller');

const routes = express();

routes.post('/addArticle',verifyToken,verifyRole('Admin'),imageUpload.single('image'),addArticle)
routes.get('/allComments/:id',verifyToken,verifyRole('Admin','User'),allArticle)
routes.delete('/allArticle',verifyToken,verifyRole('Admin'),deleteArticle)
routes.put('/editArticle/:id',verifyToken,verifyRole('Admin'),imageUpload.single('image'),editArticle)

module.exports = routes;
