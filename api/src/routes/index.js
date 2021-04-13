const express = require('express');
const router = express.Router();
const questionsRouter = require('./questionsRouter');

/* GET api info */
router.get('/', function(req, res, next) {
  res.json({
    api: {
      name: 'MCQ API',
      description: 'API to demonstrate the CRUD operations of Multiple Choice Question',
      version: '1.0.0'
    }
  });
});

router.use('/questions', questionsRouter);

module.exports = router;
