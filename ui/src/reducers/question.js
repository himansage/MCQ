import {
    EDIT_CHOICE_TEXT,
    EDIT_SELECTED_QUESTION_DETAIL,
    RESET_SELECTED_QUESTION, SET_CORRECT_CHOICE, SET_EDITABLE,
    TOGGLE_EDIT,
    UPDATE_SELECTED_QUESTION
} from "../actions/types";

const initialState = {
    selectedQuestion: {
        _id: -1,
        title: 'Enter new question title...',
        description: 'Enter new question description...',
        choices: [
            {_id:1, text: 'Enter choice 1 text...', isCorrect: true},
            {_id:2, text: 'Enter choice 2 text...', isCorrect: false},
            {_id:3, text: 'Enter choice 3 text...', isCorrect: false}
        ]
    },
    isEditable: true
}

const questionReducer = (state=initialState, action) => {
    switch (action.type) {
        case UPDATE_SELECTED_QUESTION:
            return {
                ...state,
                selectedQuestion: {
                    ...state.selectedQuestion,
                    ...action.payload
                }
            }
        case RESET_SELECTED_QUESTION:
            return state._id !== -1 ? {
                ...initialState
            } : {
                ...state
            }
        case TOGGLE_EDIT:
            return {
                ...state,
                isEditable: !state.isEditable
            }
        case SET_EDITABLE:
            return {
                ...state,
                isEditable: action.payload
            }
        case EDIT_SELECTED_QUESTION_DETAIL:
            return {
                ...state,
                selectedQuestion: {
                    ...state.selectedQuestion,
                    ...action.payload
                }
            }
        case EDIT_CHOICE_TEXT:
            const {choiceId, choiceText} = action.payload;
            const choices = state.selectedQuestion.choices.map(choice=> choice._id === choiceId ? ({
                ...choice,
                text: choiceText
            }) : choice);
            return {
                ...state,
                selectedQuestion: {
                    ...state.selectedQuestion,
                    choices
                }
            }
        case SET_CORRECT_CHOICE:
            return {
                ...state,
                selectedQuestion: {
                    ...state.selectedQuestion,
                    choices: state.selectedQuestion.choices.map(choice=> ({
                        ...choice,
                        isCorrect: choice._id === action.payload
                    }))
                }
            }
        default:
            return {
                ...state,
            }
    }
}

export default questionReducer;