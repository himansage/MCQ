import React from 'react';
import './styles.css';
import Form from "react-bootstrap/Form";
import {editSelectedQuestionDetails} from "../../../../actions/question";
import {connect} from "react-redux";

const QuestionForm = ({editable, questionFormDetail, editQuestionDetail}) => {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Question Title</Form.Label>
                <Form.Control
                    type="text"
                    disabled={!editable}
                    value={questionFormDetail.title}
                    onChange={(e)=> editQuestionDetail({title:e.target.value})}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Question description</Form.Label>
                <Form.Control
                    as='textarea'
                    className='question-description'
                    disabled={!editable}
                    value={questionFormDetail.description}
                    onChange={(e)=> editQuestionDetail({description:e.target.value})}
                />
            </Form.Group>
        </Form>
    )
}

const mapStateToProps = (state) => ({
    editable: state.question.isEditable,
    questionFormDetail: state.question.selectedQuestion
})

const mapDispatchToProps = {
    editQuestionDetail: editSelectedQuestionDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);