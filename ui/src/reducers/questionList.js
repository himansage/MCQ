import {ADD_NEW_QUESTION, REFRESH_QUESTION_LIST} from '../actions/types'

const initialState = [];

export default (state=initialState, action) => {
    switch (action.type) {
        case REFRESH_QUESTION_LIST:
            return action.payload;
        case ADD_NEW_QUESTION:
            const newQuestionList = [...state];
            if (!newQuestionList.some(question=> question._id === action.payload._id)){
                newQuestionList.push(action.payload);
            }
            return newQuestionList;
        default:
            return [...state]
    }
}