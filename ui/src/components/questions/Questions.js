import React, {useEffect} from 'react';
// Bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Component imports
import QuestionList from "./question-list/QuestionList";
import QuestionDetail from "./question-detail/QuestionDetail";
// Redux imports
import {connect} from "react-redux";
import {refreshQuestionList} from "../../actions/questionList";

const Questions = ({refreshQuestionList}) => {

    useEffect(()=> {
        refreshQuestionList();
    }, [refreshQuestionList])

    return (
        <Container fluid className='py-3'>
            <Row>
                <Col xs='3'>
                    <QuestionList />
                </Col>
                <Col>
                    <QuestionDetail />
                </Col>
            </Row>
        </Container>
    )
}

const mapDispatchToProps = {
    refreshQuestionList
}
export default connect(null, mapDispatchToProps)(Questions);