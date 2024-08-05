const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
// const enrollmentRoutes = require('./routes/enrollmentRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
// const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
// app.use('/api/enrollments', enrollmentRoutes);
// app.use('/api/payments', paymentRoutes);

// app.use(errorHandler);

module.exports = app;