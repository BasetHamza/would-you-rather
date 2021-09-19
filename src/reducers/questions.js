import { RECEIVE_QUESTIONS } from "../actions/questions";
import { ADD_QUESTION } from "../actions/shared";



export default function questions(state = {}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            }

        case ADD_QUESTION:
            
            const { question } = action 
            
            return {
                ...state,
                [question.id]: question,
            }
            
        default:
            return state 
    }
}