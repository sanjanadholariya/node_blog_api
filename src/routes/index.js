const express = require('express');

const routes = express();

routes.use('/user',require('./users.routes'))
routes.use('/article',require('./article.routes'))
routes.use('/comments',require('./comment.routes'))

module.exports = routes;