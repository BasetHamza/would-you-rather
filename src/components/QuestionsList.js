import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Alert } from 'react-bootstrap'

import QuestionCard from './QuestionCard';

/**
 * This component renders the "Answered" and "Unanswered" question lists.
 * 
 * The component depends on the authedUser and the tab the user has selected
 * to render the corresponding list. The componenet also uses the QuestionCard
 * component to list the cards of the questions.
 */

class QuestionsList extends Component {
    render() {

        const { questionListIds, tabID } = this.props

        if (questionListIds.length === 0){        
            if (tabID === 'answered'){
                return (
                    <div style={{display: 'flex', justifyContent: 'center'}}  className="mt-5">
                        <Alert key='questionNotFound' variant='warning'>
                            Ops! You do not have answered questions. Check the unanswered
                            question tab or consider creating your own question in the "New Question"
                            tab.
                        </Alert>
                    </div>
                )
            } else {
                return (
                    <div style={{display: 'flex', justifyContent: 'center'}}  className="mt-5">
                        <Alert key='questionNotFound' variant='success'>
                            Excellent work! You do not have any unanswered questions.
                        </Alert>
                    </div>
                )
            }
        }
        else {
            return (
                <div>
                    <ul style={{listStyleType: 'none'}}>
                        {
                        questionListIds.map((questionId) => (
                            <li key={questionId}>
                                <QuestionCard id={questionId}/>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            )
        }
    }
}

function mapStateToProps( {authedUser, questions}, props ) {

    const { tabID } = props


    /*
     * If the passed match prop is answered, we will return the answered questions, 
     * otherwise, we return the unanswered questions.
     */

    return {
        authedUser,
        tabID,
        questionListIds: (tabID === "answered")
            ? Object.keys(questions)
                .filter((question) => questions[question].optionOne.votes.includes(authedUser) || questions[question].optionTwo.votes.includes(authedUser))
                .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
            : Object.keys(questions)
                .filter((question) => !questions[question].optionOne.votes.includes(authedUser) && !questions[question].optionTwo.votes.includes(authedUser))
                .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(QuestionsList)