import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'

import QuestionAnswered from './QuestionAnswered'
import QuestionUnanswered from './QuestionUnanswered'

import { Alert } from 'react-bootstrap'

/*
 * A component that will render a detailed question card 
 * to be displayed when the "View Poll" button is clicked.
 * The view will differ based on the question being answered or not
 */

class Question extends Component {

    // state = {
    //     toHome: false,
    // }

    render() {        
        
        // const { question, authedUser, users, id, toHome} = this.props
        const { question, authedUser, users, id } = this.props

        /*
         * The required behavior was to stay on the same question page and show the results.
         * The behavior was achieved unintentionally due to a mistake in my code.
         * The mistake was that I did not use the state toHome properly.
         * Fixed the error from using toHome to this.state.toHome, so not it takes me to home after answering the question.
         * Since this is not the required behavior, I have commented this part to prevent redirecting the user.
         */
        
        // if (this.state.toHome === true) {
        //     return <Redirect to='/' />
        // }

        if (question === null){
            return (
                <Alert key='questionNotFound' variant='warning'>
                    This question doesn't exist!
                </Alert>
            )
        }


        /*
         * Checking if the authedUser has already answered the question or not
         * This will decide which kind of question card we will render. 
         * If already answered, we render a card that shows the result, if not
         * answered, then we render a card that takes input from the user.
         */
        
        if (id in users[authedUser].answers ){
            return (<QuestionAnswered id={id}/>)
        } else {
            return (<QuestionUnanswered id={id}/>)
        }
    }
}

function mapStateToProps ({ authedUser, users, questions }, props) {

    const {id}  = props.match.params
    const question = questions[id]

    return {
        id,
        authedUser,
        users,
        question: question
            ? question
            : null
    }
}

export default connect(mapStateToProps)(Question)
