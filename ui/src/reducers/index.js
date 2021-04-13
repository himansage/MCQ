import {combineReducers} from "redux";
import question from './question';
import questionList from "./questionList";

export default combineReducers({question, questionList});