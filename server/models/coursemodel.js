const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title:String,
    author:String,
    free:Boolean,
    overview:String,
    img:String,
    url:String

});

module.exports = mongoose.model("CourseModel", CourseSchema);