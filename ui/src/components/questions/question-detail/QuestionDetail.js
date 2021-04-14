import React, {Fragment} from 'react';
// Bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// Component imports
import ChoiceList from "./choice-list/ChoiceList";
import QuestionForm from "./question-form/QuestionForm";
// Redux imports
import {refreshQuestionList} from "../../../actions/questionList";
import {connect} from "react-redux";
import {toggleEditable, saveQuestionChanges, deleteQuestion} from '../../../actions/question';


const QuestionDetail = ({editable, questionDetail, refreshQuestionList, toggleEditable, saveQuestionChanges, deleteQuestion}) => {

    const selectedQuestionId = questionDetail._id;

    return (
        <Container fluid className='py-3 shadow-lg rounded'>
            {questionDetail && Object.keys(questionDetail).length !== 0 && <Row>
                <Col xs='7'>
                    <div className='d-flex justify-content-between mb-3'>
                        <span className='h3'>Question details:</span>
                        <div>
                            {!editable && selectedQuestionId !== -1 && <Fragment>
                                <Button variant="primary" onClick={toggleEditable}>
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={()=>deleteQuestion(selectedQuestionId)}>
                                    Delete
                                </Button>
                            </Fragment>
                            }
                            {editable && <Button variant="primary" onClick={()=>saveQuestionChanges(questionDetail)}>
                                Save
                            </Button>}
                            {editable && <Button variant="secondary" onClick={()=>refreshQuestionList()}>
                                Cancel
                            </Button>}
                        </div>
                    </div>
                    <QuestionForm />
                </Col>
                <Col xs='5'>
                    <h3>Answer choices:</h3>
                    <ChoiceList />
                </Col>
            </Row>}
        </Container>
    )
};

const mapStateToProps = (state) => ({
    questionDetail: state.question.selectedQuestion,
    editable: state.question.isEditable
})

const mapDispatchToProps = {
    refreshQuestionList,
    toggleEditable,
    saveQuestionChanges,
    deleteQuestion
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);