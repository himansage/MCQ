const Question = require('../db/models/Question');
const questionService = {};

questionService.findAllQuestions = () => {
    return Question.find({}, {title: 1});
};

questionService.addQuestion = async (questionData) => {
    // check if the question with same title already exists
    let question = await Question.findOne({title: questionData.title});
    if (question) {
        throw new Error('Question already exists.');
    }

    question = new Question(questionData)
    return await question.save();
};

questionService.removeQuestion = async (questionId) => {
    await Question.deleteOne({_id: questionId});
    return true;
}

questionService.removeAllQuestions = async () => {
    await Question.deleteMany({});
    return true;
}

questionService.getQuestionByTitle = async (questionTitle) => {
    const question = await Question.findOne({title: questionTitle});
    if (!question) {
        throw new Error('Question not found.');
    }
    return question;
}

questionService.getQuestionById = async (questionId) => {
    const question = await Question.findOne({_id: questionId});
    if (!question) {
        throw new Error('Question not found.');
    }
    return question;
}

questionService.updateQuestionTitle = async (questionId, newTitle) => {

    // check if the question exists
    let question = await Question.findById(questionId);
    if (!question) {
        throw new Error('Question does not exist');
    }

    // check if the question title in the to be updated is not duplicate
    let duplicateQuestion = await Question.findOne({title: newTitle});
    if (duplicateQuestion && duplicateQuestion.id != questionId) {
        throw new Error('Question already exists with the given title');
    }

    question.title = newTitle;
    return await question.save();
}

questionService.updateQuestionDescription = async (questionId, newDescription) => {
    // check if the question exists
    let question = await Question.findById(questionId);
    if (!question) {
        throw new Error('Question does not exist');
    }

    question.description = newDescription;
    return await question.save();
}

questionService.updateQuestionChoices = async (questionId, newChoices) => {
    // check if the question exists
    let question = await Question.findById(questionId);
    if (!question) {
        throw new Error('Question does not exist');
    }

    // validate the choices
    let choiceSet = new Set();
    let correctChoiceCount = 0;
    for (let choice of newChoices) {
        choiceSet.add(choice.text);
        choice.isCorrect && correctChoiceCount++;
    }
    if (choiceSet.size !== newChoices.length) {
        throw new Error ('All choices should have unique text');
    } else if (correctChoiceCount > 1) {
        throw new Error ('Only 1 choice should be correct');
    }

    // update the question choices
    question.choices = newChoices;
    return await question.save();
}

questionService.updateQuestion = async (questionId, questionData) => {
    // check if the question exists
    let question = await Question.findById(questionId);
    if (!question) {
        throw new Error('Question does not exist');
    }

    const {title, description, choices} = questionData;

    // update title if not same
    if (title !== question.title) {
        await questionService.updateQuestionTitle(questionId, title);
    }

    // update description if not same
    if (description !== question.description) {
        await questionService.updateQuestionDescription(questionId, description);
    }

    // directly replacing instead of deep compare
    return questionService.updateQuestionChoices(questionId, choices);
}

questionService.deleteQuestion = async (questionId) => {
    // check if the question exists
    let question = await Question.findById(questionId);
    if (!question) {
        throw new Error('Question does not exist');
    }

    try {
        await Question.findByIdAndDelete(questionId);
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}

module.exports = questionService;