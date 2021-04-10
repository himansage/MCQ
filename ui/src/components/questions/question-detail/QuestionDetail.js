import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChoiceList from "./choice-list/ChoiceList";
import QuestionForm from "./question-form/QuestionForm";
import {Button, Form} from "react-bootstrap";

const apiResponse = {
    id: 1,
    title: 'Why do we need to design before development?',
    description: 'Why design phase is placed before development phase in SDLC. Select one of the options.',
    choices: [
        {
            id: 1,
            text: 'Because it was introduced before software development',
            isCorrect: false
        },
        {
            id: 2,
            text: 'Creating a design before starting development reduces the amount of rework',
            isCorrect: true
        },
        {
            id: 3,
            text: 'The phases are arranged randomly and can be placed anywhere',
            isCorrect: false
        }
    ]
}

const QuestionDetail = ({selectedQuestionId, loadQuestionsFromServer}) => {

    const [questionDetail, setQuestionDetail] = useState({});
    const [editable,setEditable] = useState(false);

    const toggleEditable = () => {
        setEditable(!editable);
    }

    const setCorrectChoice = (choiceId) => {
        const choices = questionDetail.choices.map(choice=> ({
            ...choice,
            isCorrect: choice.id == choiceId
        }));
        setQuestionDetail({
            ...questionDetail,
            choices
        });
    }

    const editChoiceText = (choiceId, choiceText) => {
        const choices = questionDetail.choices.map(choice=> choice.id === choiceId ? ({
            ...choice,
            text: choiceText
        }) : choice);

        setQuestionDetail({
            ...questionDetail,
            choices
        });
    }

    const editQuestionDetail = (newQuestionDetail) => {
        setQuestionDetail({
            ...questionDetail,
            ...newQuestionDetail
        });
    }

    const cancelChanges = () => {
        setEditable(false);
        loadQuestionsFromServer();
    }

    useEffect(()=> {
        setEditable(selectedQuestionId==-1);
    }, [selectedQuestionId])

    useEffect(()=> {
        if (selectedQuestionId != -1) {
            // call api and remove the dummy data
            setQuestionDetail({...apiResponse, id: selectedQuestionId});
        } else {
            setQuestionDetail({
                title: 'Enter question title...',
                description: 'Enter question description...',
                choices: [
                    {
                        id: 1,
                        text: 'Enter option 1...',
                        isCorrect: true
                    },
                    {
                        id: 2,
                        text: 'Enter option 2...',
                        isCorrect: false
                    },
                    {
                        id: 3,
                        text: 'Enter option 3...',
                        isCorrect: false
                    }
                ]
            })
        }
    }, [selectedQuestionId]);

    const {choices, ...questionFormDetail} = questionDetail;

    return (
        <Container fluid className='py-3 shadow-lg rounded'>
            {questionDetail && Object.keys(questionDetail).length !== 0 && <Row>
                <Col xs='7'>
                    <div className='d-flex justify-content-between mb-3'>
                        <span className='h3'>Question details:</span>
                        <div>
                            {!editable && <Button variant="primary" onClick={toggleEditable}>
                                Edit
                            </Button>}
                            {!editable && <Button variant="danger">
                                Delete
                            </Button>}
                            {editable && <Button variant="primary" onClick={toggleEditable}>
                                Save
                            </Button>}
                            {editable && <Button variant="secondary" onClick={cancelChanges}>
                                Cancel
                            </Button>}
                        </div>
                    </div>
                    <QuestionForm
                        questionFormDetail={questionFormDetail}
                        editQuestionDetail={editQuestionDetail}
                        editable={editable}
                        toggleEditable={toggleEditable}
                    />
                </Col>
                <Col xs='5'>
                    <h3>Answer choices:</h3>
                    <ChoiceList
                        choices={choices}
                        setCorrectChoice={setCorrectChoice}
                        editChoiceText={editChoiceText}
                        editable={editable}
                        toggleEditable={toggleEditable}
                    />
                </Col>
            </Row>}
        </Container>
    )
};

export default QuestionDetail;