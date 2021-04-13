import {
    UPDATE_SELECTED_QUESTION,
    RESET_SELECTED_QUESTION,
    TOGGLE_EDIT,
    EDIT_SELECTED_QUESTION_DETAIL,
    EDIT_CHOICE_TEXT, SET_CORRECT_CHOICE,
    SET_EDITABLE
} from './types';
import axios from "axios";
import {refreshQuestionList} from "./questionList";

export const updateSelectedQuestion = (selectedQuestionId) => async (dispatch) => {
    if (selectedQuestionId !== -1) {
        const res = await axios.get(`/api/questions/${selectedQuestionId}`);
        dispatch({
            type: UPDATE_SELECTED_QUESTION,
            payload: res.data,
        });
        dispatch(setEditable(false));
    } else {
        dispatch({
            type: RESET_SELECTED_QUESTION
        })
        dispatch(setEditable(true));
    }
};

export const toggleEditable = () => (dispatch) => {
    dispatch({
        type: TOGGLE_EDIT
    })
}

export const setEditable = (editable) => (dispatch) => {
    dispatch({
        type: SET_EDITABLE,
        payload: editable
    })
}


export const editSelectedQuestionDetails = (newQuestionDetail) => (dispatch) => {
    dispatch({
        type: EDIT_SELECTED_QUESTION_DETAIL,
        payload: newQuestionDetail
    })
}

export const setCorrectChoice = (choiceId) => (dispatch) => {
    dispatch({
        type: SET_CORRECT_CHOICE,
        payload: choiceId
    })
}

export const editChoiceText = (choiceId, choiceText) => (dispatch) => {
    dispatch({
        type: EDIT_CHOICE_TEXT,
        payload: {
            choiceId,
            choiceText
        }
    })
}

export const saveQuestionChanges = (questionData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        // add new question
        let res;
        if (questionData._id === -1) {
            // remove the temporary _id from data
            const {_id, ...questionDataWithoutId} = questionData;
            questionDataWithoutId.choices = questionDataWithoutId.choices.map(choice => {
                const {_id, ...choiceDataWithoutId} = choice;
                return choiceDataWithoutId;
            })

            const body = JSON.stringify(questionDataWithoutId);
            res = await axios.post('/api/questions', body, config);
        } else {
            const body = JSON.stringify(questionData);
            res = await axios.patch(`/api/questions/${questionData._id}`, body, config)
        }

        dispatch(refreshQuestionList());
        dispatch(updateSelectedQuestion(res.data._id));
    } catch (err) {
        const errors = err.response.data.errors;
        console.error(errors);
        dispatch(refreshQuestionList());
    }

}

export const deleteQuestion = (questionId) => async (dispatch) => {
    try {
        console.log(questionId)
        await axios.delete(`/api/questions/${questionId}`);
        dispatch(refreshQuestionList());
    } catch (err) {
        const errors = err.response.data.errors;
        console.error(errors);
        dispatch(refreshQuestionList());
    }
}