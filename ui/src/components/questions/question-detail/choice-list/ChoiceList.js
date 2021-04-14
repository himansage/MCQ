import React from 'react';
// Bootstrap imports
import FormControl from "react-bootstrap/FormControl";
import InputGroup from 'react-bootstrap/InputGroup';
// Redux imports
import {setCorrectChoice, editChoiceText} from '../../../../actions/question';
import {connect} from "react-redux";

const ChoiceList = ({selectedQuestion, setCorrectChoice, editChoiceText, editable}) => {

    const {choices} = selectedQuestion;

    const onChange = (e) => {
        setCorrectChoice(e.target.value);
    }

    return (
        <div>
            {choices.map(choice=>(
                <InputGroup key={choice._id} className='mb-2'>
                    <InputGroup.Prepend>
                        <InputGroup.Radio
                            name='choices'
                            checked={choice.isCorrect}
                            disabled={!editable}
                            value={choice._id}
                            onChange={onChange}
                        />
                    </InputGroup.Prepend>
                    <FormControl
                        as="textarea"
                        value={choice.text}
                        onChange={(e)=>editChoiceText(choice._id, e.target.value)}
                        disabled={!editable}
                    />
                </InputGroup>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => ({
    editable: state.question.isEditable,
    selectedQuestion: state.question.selectedQuestion
})

const mapDispatchToProps = {
    setCorrectChoice,
    editChoiceText
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceList);