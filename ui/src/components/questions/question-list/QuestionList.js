import React from 'react';
// Bootstrap imports
import ListGroup from "react-bootstrap/ListGroup";
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
// Redux imports
import {connect} from "react-redux";
import {addNewQuestionToList} from '../../../actions/questionList';
import {updateSelectedQuestion} from "../../../actions/question";

const QuestionList = ({questionList, selectedQuestionId, updateSelectedQuestion, addNewQuestionToList}) => {
    return (
        <Container className='py-3 shadow-lg rounded'>
            <div className='d-flex justify-content-between mb-3'>
                <span className='h3'>Questions:</span>
                <Button variant="primary" disabled={selectedQuestionId===-1} onClick={()=>addNewQuestionToList()}>
                    Add
                </Button>
            </div>
            <ListGroup as="ul">
                {questionList.map(question=>(
                    <ListGroup.Item
                        action as='button'
                        key={question._id}
                        active={question._id===selectedQuestionId}
                        onClick={()=>updateSelectedQuestion(question._id)}>
                        {question.title}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    questionList: state.questionList,
    selectedQuestionId: state.question.selectedQuestion._id,
})

const mapDispatchToProps = {
    addNewQuestionToList,
    updateSelectedQuestion
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);