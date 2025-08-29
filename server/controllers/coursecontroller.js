const CourseModel = require('../models/coursemodel');
const data = require('../data/courses.json');

module.exports.loadAllCourses = async (req, res) => {
    try {
        insertCourses();
        const result = await CourseModel.find();
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json(results);
    } catch (error) {
        console.log(error);
    }
}

const insertCourses = async () => {
    await CourseModel.insertMany(data, (err, elem) => {
        if (!err) console.log("Course Inserted Successfully with elements \n" + elem);
        else console.log("Error inserting courses: " + err);
    });
};