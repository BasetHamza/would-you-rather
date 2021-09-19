import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'

import { receiveQuestions } from '../actions/questions'
import { receiveUsers } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser'

import { showLoading, hideLoading } from 'react-redux-loading'

// TODO: Remove the hardcoded user before submission
// const AUTHED_ID = "sarahedo"
// const AUTHED_ID = "tylermcginnis"
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'SAVE_QUESTION_ANSWER'

export function addAnswer(savedAnswer) {
    return {
        type: ADD_ANSWER,
        savedAnswer,
    }
}

export function handleAddAnswer ( qid, answer ) {
    return (dispatch, getState) => {
        const {authedUser} = getState()

        dispatch(showLoading())

        const userAnswer = {
             authedUser,
             qid,
             answer
        }

        return saveQuestionAnswer(userAnswer)
            .then(
                () => {
                    dispatch(addAnswer(userAnswer))
                }
            )
            .then(() => dispatch(hideLoading()))
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion ( optionOneText, optionTwoText ) {
    return (dispatch, getState) => {
        const {authedUser} = getState()

        dispatch(showLoading())

        return saveQuestion({
             optionOneText,
             optionTwoText,
             author: authedUser
        })
            .then(
                (question) => {
                    dispatch(addQuestion(question))
                }
            )
            .then(() => dispatch(hideLoading()))
    }
}

export function handleInitialData() {
     return (dispatch) => {

        dispatch(showLoading())

         return getInitialData()
            .then(( {users, questions} ) => {
                dispatch(receiveQuestions(questions))
                dispatch(receiveUsers(users))
                dispatch(setAuthedUser("")) 
                // TODO: Replace the hardcoded user with ""
                dispatch(hideLoading())
            })
     }
}
