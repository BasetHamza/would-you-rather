import React, { Component } from 'react'
import { connect } from 'react-redux'

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

        const { questionListIds } = this.props

        return (
            <div>
                <ul>
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

function mapStateToProps( {authedUser, questions}, props ) {

    const {tabID} = props.match.params

    // If the passed match prop is answered, we will return the answered questions, otherwise, we return the unanswered questions.

    return {
        authedUser,
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