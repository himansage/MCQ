import React from 'react';
import FormControl from "react-bootstrap/FormControl";
import InputGroup from 'react-bootstrap/InputGroup'

const ChoiceList = ({choices, setCorrectChoice, editChoiceText, editable}) => {

    const onChange = (e) => {
        setCorrectChoice(e.target.value);
    }

    return (
        <div>
            {choices.map(choice=>(
                <InputGroup key={choice.id} className='mb-2'>
                    <InputGroup.Prepend>
                        <InputGroup.Radio
                            name='choices'
                            checked={choice.isCorrect}
                            disabled={!editable}
                            value={choice.id}
                            onChange={onChange}
                        />
                    </InputGroup.Prepend>
                    <FormControl
                        as="textarea"
                        value={choice.text}
                        onChange={(e)=>editChoiceText(choice.id, e.target.value)}
                        disabled={!editable}
                    />
                </InputGroup>
            ))}
        </div>
    )
}

export default ChoiceList;