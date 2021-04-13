const express = require('express');
const {check, body, validationResult, matchedData} = require('express-validator');

const router = express.Router();
const questionService = require('../services/questionService');


router.get('/', async (req, res, next) => {
    res.json(await questionService.findAllQuestions());
});

router.get('/byTitle/:title', [
    check('title', 'title should be present in query params').not().isEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    questionService.getQuestionByTitle(req.params.title)
        .then(question => {
            res.status(200).json(question);
        })
        .catch(err=> {
            res.status(404).send(err.message);
        })
})

router.get('/:id', [
    check('id', 'id should be present in query params').not().isEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    questionService.getQuestionById(req.params.id)
        .then(question => {
            res.status(200).json(question);
        })
        .catch(err=> {
            res.status(404).send(err.message);
        })
})

router.post('/', [
    body('title', 'title is mandatory').not().isEmpty(),
    body('description', 'description is mandatory').not().isEmpty(),
    body('choices', 'choices are mandatory').not().isEmpty(),
    body('choices', 'choices should be an array').isArray()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    questionService.addQuestion(req.body)
        .then(question => {
            res.status(200).json(question);
        })
        .catch(err=> {
            res.status(500).send(err.message);
        })
});

router.patch('/:questionId/title', [
    check('questionId', 'questionId param is mandatory').not().isEmpty(),
    body('title', 'title is mandatory').not().isEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    questionService.updateQuestionTitle(req.params.questionId, req.body.title)
        .then(question => {
            res.status(200).json(question);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});

router.patch('/:questionId/description', [
    check('questionId', 'questionId param is mandatory').not().isEmpty(),
    body('description', 'description is mandatory').not().isEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    questionService.updateQuestionDescription(req.params.questionId, req.body.description)
        .then(question => {
            res.status(200).json(question);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});

router.patch('/:questionId/choices', [
    check('questionId', 'questionId param is mandatory').not().isEmpty(),
    body('choices', 'choices array is mandatory').not().isEmpty(),
    body('choices', 'choices should be an array').isArray(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    questionService.updateQuestionChoices(req.params.questionId, req.body.choices)
        .then(question => {
            res.status(200).json(question);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});

router.patch('/:questionId', [
    check('questionId', 'questionId param is mandatory').not().isEmpty(),
    body('title', 'title is mandatory').not().isEmpty(),
    body('description', 'description is mandatory').not().isEmpty(),
    body('choices', 'choices array is mandatory').not().isEmpty(),
    body('choices', 'choices should be an array').isArray(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    questionService.updateQuestion(req.params.questionId, req.body)
        .then(question => {
            res.status(200).json(question);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});

router.delete('/:questionId', [
    check('questionId', 'questionId param is mandatory').not().isEmpty(),
], (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    questionService.deleteQuestion(req.params.questionId)
        .then(() => {
            res.status(200).send(true);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
        })
})

module.exports = router;
