const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getCourses = async (req, res) => {
  const courses = await prisma.course.findMany();
  res.json(courses);
};

const createCourse = async (req, res) => {
    try {
     const {title,description,Instructorname,price} = req.body;
  
      if (!title || !description || !Instructorname) {
        return res.status(400).json({ title,description,price,Instructorname });
      }
  
      const course = await prisma.course.create({
        data: {
          title,
          description,
          price,
          Instructorname,
        }
      });
  
      res.json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


const enrollmentCourse = async (req,res) => {
  const { courseId } = req.body;
  const enrollment = await prisma.enrollment.create({
    data: { userId: req.user.userId, courseId }
  });
}

const getUserCourses = async (req, res) => {
  const userCourses = await enrollment.findMany({
    where: { userId: req.user.userId },
    include: { course: true }
  });
  res.json(userCourses.map(enrollment => enrollment.course));
};

module.exports = { getCourses, createCourse,enrollmentCourse,getUserCourses };
