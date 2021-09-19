import { RECEIVE_QUESTIONS } from "../actions/questions";
import { ADD_QUESTION, ADD_ANSWER } from "../actions/shared";

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
            
        case ADD_ANSWER:

            const { savedAnswer } = action
            const { qid, answer, authedUser } = savedAnswer 
            
            return {
                ...state,
                [qid]: {
                ...state[qid],
                [answer]: {
                    ...state[qid][answer],
                    votes: state[qid][answer].votes.concat([authedUser])
                }
                }
            }

        default:
            return state 
    }
}