import { getInitialData, saveQuestion } from '../utils/api'

import { receiveQuestions, addQuestionQuestionsComponent } from '../actions/questions'
import { receiveUsers, addQuestionUserComponent } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser'

import { showLoading, hideLoading } from 'react-redux-loading'

// TODO: Remove the hardcoded user before submission
// const AUTHED_ID = "sarahedo"
// const AUTHED_ID = "tylermcginnis"

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
                    dispatch(addQuestionQuestionsComponent(question))
                    // dispatch(addQuestionUserComponent(question))
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
