import { getInitialData } from '../utils/api'
import { receiveQuestions } from '../actions/questions'
import { receiveUsers } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser'

import { showLoading, hideLoading } from 'react-redux-loading'

// TODO: Remove the hardcoded user before submission
const AUTHED_ID = "sarahedo"
// const AUTHED_ID = "tylermcginnis"


export function handleInitialData() {
     return (dispatch) => {

        dispatch(showLoading())

         return getInitialData()
            .then(( {users, questions} ) => {
                dispatch(receiveQuestions(questions))
                dispatch(receiveUsers(users))
                dispatch(setAuthedUser(AUTHED_ID)) 
                // TODO: Replace the hardcoded user with ""
                dispatch(hideLoading())
            })
     }
}
