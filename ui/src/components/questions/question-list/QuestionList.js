import React from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";

const QuestionList = ({questionList, selectedQuestionId, setSelectedQuestionId, addQuestion}) => {
    return (
        <Container className='py-3 shadow-lg rounded'>
            <div className='d-flex justify-content-between mb-3'>
                <span className='h3'>Questions:</span>
                <Button variant="primary" disabled={selectedQuestionId==-1} onClick={()=>addQuestion()}>
                    Add
                </Button>
            </div>
            <ListGroup as="ul">
                {questionList.map(question=>(
                    <ListGroup.Item
                        action as='button'
                        key={question.id}
                        active={question.id===selectedQuestionId}
                        onClick={()=>setSelectedQuestionId(question.id)}>
                        {question.title}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
}

export default  QuestionList;