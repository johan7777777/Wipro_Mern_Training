const express = require('express');
const morgan = require('morgan');
const requestLogger = require('./middleware/requestlogger');
const studentValidator = require('./middleware/studentvalidator');

const app = express();

// User Story 3 – body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User Story 4 – Morgan logger (development mode)
app.use(morgan('dev'));

// User Story 1 – custom request logger
app.use(requestLogger);

// User Story 2 – student validation
app.post('/student', studentValidator, (req, res) => {
  res.json({
    message: 'Student data is valid',
    student: req.body
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});