const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/todoApp")
.then(() => {console.log(`MongoDB connected`)})

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const TODO = mongoose.model('todos',todoSchema);

module.exports = {TODO};