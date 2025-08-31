const CourseModel = require('../models/coursemodel');
const data = require('../data/courses.json');

module.exports.loadAllCourses = async (req, res) => {
    try {
        insertCourses();
        const result = await CourseModel.find();
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}

const insertCourses = async () => {
  try {
    const inserted = await CourseModel.insertMany(data, { ordered: false }); 
    console.log("Courses inserted successfully:", inserted.length);
  } catch (err) {
    if (err.code === 11000) {
      console.warn("Duplicate entries detected. Skipping insert.");
    } else {
      console.error("Error inserting courses:", err);
    }
  }
};
