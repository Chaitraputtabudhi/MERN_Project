            const mongoose = require("mongoose");
const { autoIncrement } = require('mongoose-plugin-autoinc');

const CourseSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    free: {
        type: Boolean,
        required: true,
    },
    overview: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    url: {
        type: Boolean,
        required: true,
    },
},{ collection: "CourseModel" });

CourseSchema.plugin(autoIncrement, {model: 'CourseModel', field: 'id', startAt: 1, incrementBy: 1});
module.exports = mongoose.model("CourseModel", CourseSchema);
