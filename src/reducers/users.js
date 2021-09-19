import { RECEIVE_USERS } from "../actions/users";
import { ADD_QUESTION, ADD_ANSWER } from "../actions/shared";


export default function users(state = {}, action){

    let authedUser = ''

    switch(action.type){
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }

        case ADD_QUESTION:
            const { question } = action 
            authedUser = question.author

            return {
                ...state,
                [authedUser]: {
                ...state[authedUser],
                questions: state[authedUser].questions.concat([question.id])
                }
            }

        case ADD_ANSWER:

            const { savedAnswer } = action

            authedUser = savedAnswer.authedUser

            return {
                ...state,
                [authedUser]: {
                  ...state[authedUser],
                  answers: {
                    ...state[authedUser].answers,
                    [savedAnswer.qid]: savedAnswer.answer
                  }
                }
            }

        default:
            return state 
    }
}