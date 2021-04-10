import React, {useEffect, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QuestionList from "./question-list/QuestionList";
import QuestionDetail from "./question-detail/QuestionDetail";

const initialState = [
    {
        id: 1,
        title: 'Why do we need to design before development?'
    },
    {
        id: 2,
        title: 'Select the options which are true?'
    },
    {
        id: 3,
        title: 'Select the option which is false'
    },
    {
        id: 4,
        title: 'Why do we need to study Data structures?'
    }
];

const Questions = () => {
    const [questionList, setQuestionList] = useState([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState(0)

    const addQuestion = () => {
        const newQuestionList = [...questionList];
        selectedQuestionId !== -1 &&
            !newQuestionList.some((question)=>question.id===-1) &&
                newQuestionList.push({id:-1, title: 'Enter question detail'});
        setQuestionList(newQuestionList);
        setSelectedQuestionId(-1);
    }

    const loadQuestionsFromServer = () => {
        // call api and update state as per response
        setQuestionList(initialState);
        setSelectedQuestionId(initialState[0].id)
    }

    useEffect(()=> {
        loadQuestionsFromServer();
    }, [])

    return (
        <Container fluid className='py-3'>
            <Row>
                <Col xs='3'>
                    <QuestionList
                        questionList={questionList}
                        selectedQuestionId={selectedQuestionId}
                        setSelectedQuestionId={setSelectedQuestionId}
                        addQuestion={addQuestion}
                    />
                </Col>
                <Col>
                    <QuestionDetail
                        selectedQuestionId={selectedQuestionId}
                        loadQuestionsFromServer={loadQuestionsFromServer}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Questions;