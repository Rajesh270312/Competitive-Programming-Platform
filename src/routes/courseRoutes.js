const express = require('express');
const { getCourses, createCourse, enrollmentCourse, getUserCourses } = require('../controller/courseController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getCourses);
router.post('/', authenticateToken, authorizeRole(['ADMIN']), createCourse);
router.post('/purchase', authenticateToken, enrollmentCourse);
router.get('/user', authenticateToken, getUserCourses);

module.exports = router;
