import { Router } from 'express';
import { getAllStudents, getStudentById } from './services/students.js';

const router = Router();

router.get('/students', async (req, res) => {
  const students = await getAllStudents();

  res.status(200).json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
});

router.get('/students/:studentId', async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  // Відповідь, якщо контакт не знайдено
  if (!student) {
    res.status(404).json({
      message: 'Student not found',
    });
    return;
  }

  // Відповідь, якщо контакт знайдено
  res.status(200).json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
});

export default router;
