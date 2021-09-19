export const RECEIVE_USERS = 'RECEIVE_USERS'
// export const ADD_QUESTION = 'ADD_QUESTION'
export const SET_QUESTION_ANSWER = 'SET_QUESTION_ANSWER'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

// export function addQuestion (question) {
//     return {
//         type: ADD_QUESTION,
//         question,
//     }
// }