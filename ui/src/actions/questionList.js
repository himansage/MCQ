import axios from "axios";
import {REFRESH_QUESTION_LIST, ADD_NEW_QUESTION} from './types';
import {updateSelectedQuestion} from "./question";

export const refreshQuestionList = () => async (dispatch) => {

    try {
        const res = await axios.get('/api/questions');

        dispatch({
            type: REFRESH_QUESTION_LIST,
            payload: res.data,
        });
        if (res.data.length) {
            dispatch(updateSelectedQuestion(res.data[0]._id));
        } else {
            dispatch(addNewQuestionToList());
        }
    } catch (err) {
        console.error(err);
    }
}

export const addNewQuestionToList = () => (dispatch) => {
    dispatch({
        type: ADD_NEW_QUESTION,
        payload: {
            title: 'Enter new question',
            _id: -1
        }
    })
    dispatch(updateSelectedQuestion(-1))
}