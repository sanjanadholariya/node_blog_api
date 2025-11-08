const mongoose = require('mongoose')

const dbConnect = () => {
    try {
        mongoose.connect(`${process.env.DB_LINK}`)
        console.log("Database connect successfully.")
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect();