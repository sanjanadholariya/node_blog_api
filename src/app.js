require('dotenv').config();

const express = require('express');
const app = express();
const dbConnect = require('./config/dbConnect')
const port = process.env.PORT;

app.use(express.urlencoded());
app.use(express.json());

app.use('/api',require('./routes/index'));

app.listen(port , (err) => {
    err ? console.log(err) : console.log(`port is running on http://localhost:${port}`)
})