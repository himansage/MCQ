const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const db = require('../../src/db');

const questionService = require('../../src/services/questionService');

describe('questionService tests', () => {

    let question;
    beforeEach(async () =>{
        await db.connect();
        const questionData = {
            title: 'Question title',
            description: 'Question description',
            choices: [
                {id: 1, text: 'Choice 1', isCorrect: false},
                {id: 2, text: 'Choice 2', isCorrect: true},
                {id: 3, text: 'Choice 3', isCorrect: false}
            ]
        }
        question = await questionService.addQuestion(questionData);
    });
    afterEach(async ()=> {
        await questionService.removeAllQuestions();
        await db.close();
    })

    describe('finding question', function () {

        describe('without any filter', () => {
            it('should return an array with questions', async () => {
                const res = await questionService.findAllQuestions();
                expect(res).to.be.an.instanceOf(Array);
                expect(res).to.have.length(1);
            });
        });

        describe('with title existing in database', () => {
            it('should return the question', async () => {
                const res = await questionService.getQuestionByTitle(question.title);
                expect(res.title).to.be.equals(question.title);
            })
        })

        describe('with title that does not exist in database', () => {
            it('should reject the promise', () => {
                return expect(questionService.getQuestionByTitle('Random Title')).to.eventually.be.rejected;
            })
        })

        describe('with id existing in database', () => {
            it('should return the question', async () => {
                const res = await questionService.getQuestionById(question.id);
                expect(res.title).to.be.equals(question.title);
            })
        })

        describe('with id that does not exist in database', () => {
            it('should reject the promise', () => {
                return expect(questionService.getQuestionById('random id')).to.eventually.be.rejected;
            })
        })
    });

    describe('adding question', () => {
        describe('with valid question data', () => {
            it('should return added question', async () => {
                const questionData = {
                    title: 'Question title 1',
                    description: 'Question description',
                    choices: [
                        {id:0, text: 'Choice 1', isCorrect: false},
                        {id:1, text: 'Choice 2', isCorrect: true},
                        {id:2, text: 'Choice 3', isCorrect: false}
                    ]
                }

                const res = await questionService.addQuestion(questionData);
                expect(res).to.have.property('_id');
                expect(res.title).to.be.equals(questionData.title);
            })
        })

        describe('with duplicate question title', () => {
            it('should reject the promise', () => {
                const duplicateQuestionData = {...question.toObject(), description: 'Some new data'};
                return expect(questionService.addQuestion(duplicateQuestionData)).to.eventually.be.rejected;
            })
        })
    });

    describe('updating question', () => {
        describe('update title with valid data', () => {
            it('should return updated question', async () => {
                const newTitle = 'New Title';
                const updatedQuestion = await questionService.updateQuestionTitle(question.id, newTitle);
                expect(updatedQuestion).to.be.an.instanceOf(Object);
                expect(updatedQuestion.id).to.be.equals(question.id);
                expect(updatedQuestion.title).to.be.equals(newTitle);
            });
        });
        describe('update title with duplicate data', () => {
            it('should reject the promise', async () => {
                const newQuestionData = {
                    title: 'New Question',
                    description: 'New question description',
                    choices: question.choices
                };

                // add a question with title 'New Title'
                const newQuestion = await questionService.addQuestion(newQuestionData);

                // try to modify title of other existing question to 'New Title'
                expect(questionService.updateQuestionTitle(newQuestion.id, question.title)).to.eventually.be.rejected;
            });
        });
        describe('update description', () => {
            it('should return updated question', async () => {
                const newDescription = 'New question description';
                const updatedQuestion = await questionService.updateQuestionDescription(question.id, newDescription);
                expect(updatedQuestion).to.be.an.instanceOf(Object);
                expect(updatedQuestion.id).to.be.equals(question.id);
                expect(updatedQuestion.description).to.be.equals(newDescription);
            });
        });
        describe('update choices with valid data', () => {
            it('should return updated question', async () => {
                const newChoices = [
                    {text: 'Choice text 1', isCorrect: false},
                    {text: 'Choice text 2', isCorrect: true},
                    {text: 'Choice text 3', isCorrect: false}
                ];

                const updatedQuestion = await questionService.updateQuestionChoices(question.id, newChoices);

                expect(updatedQuestion).to.be.an.instanceOf(Object);
                expect(updatedQuestion.id).to.be.equals(question.id);
                for (let i=0; i<newChoices.length; i++) {
                    const {_id, ...choice} = updatedQuestion.choices[i].toObject();
                    expect(choice).to.be.eql(newChoices[i]);
                }
            });
        });
        describe('update choices with duplicate choice texts', () => {
            it('should reject the promise', async () => {
                const newChoices = [
                    {text: 'Choice text 1', isCorrect: false},
                    {text: 'Choice text 1', isCorrect: true},
                    {text: 'Choice text 3', isCorrect: false}
                ];

                return expect(questionService.updateQuestionChoices(question.id, newChoices)).to.eventually.be.rejected;
            });
        });
        describe('update choices with multiple correct choices', () => {
            it('should reject the promise', async () => {
                const newChoices = [
                    {text: 'Choice text 1', isCorrect: false},
                    {text: 'Choice text 2', isCorrect: true},
                    {text: 'Choice text 3', isCorrect: true}
                ];

                return expect(questionService.updateQuestionChoices(question.id, newChoices)).to.eventually.be.rejected;
            });
        });
        describe('with entire new object', () => {
            it('should return updated question', async () => {
                const newData = {
                    title: 'New question title',
                    description: 'New question description',
                    choices: [
                        {text: 'new choice 1', isCorrect: false},
                        {text: 'new choice 2', isCorrect: true},
                        {text: 'new choice 3', isCorrect: false}
                    ]
                }

                const res = await questionService.updateQuestion(question.id, newData);

                expect(res).to.be.an.instanceOf(Object);
                expect(res.id).to.be.equals(question.id);
                expect(res.title).to.be.equals(newData.title);
                expect(res.description).to.be.equals(newData.description);
                for (let i=0; i<newData.choices.length; i++) {
                    const {_id, ...choice} = res.choices[i].toObject();
                    expect(choice).to.be.eql(newData.choices[i]);
                }
            })
        })
    });
});