const express = require('express');
const coursecontroller = require('../controllers/coursecontroller');
const router = express.Router();

router.get('/loadAllCourses',coursecontroller.loadAllCourses);

module.exports = router;