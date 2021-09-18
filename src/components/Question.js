import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Button, Col, Row, Alert, ProgressBar } from 'react-bootstrap'

/*
 * A component that will render a detailed question card 
 * to be displayed when the "View Poll" button is clicked.
 * The view will differ based on the question being answered or not
 */

class Question extends Component {
    render() {        
        
        const { question, authedUser, users, id} = this.props

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
        
        if ( id in users[authedUser].answers ){

            const { author } = question
            const optionOneText = question.optionOne.text
            const optionTwoText = question.optionTwo.text
            const optionOneVotes = question.optionOne.votes.length
            const optionTwoVotes = question.optionTwo.votes.length
            const totalVotes = optionOneVotes + optionTwoVotes
            const optionOnePercentage = 100*(optionOneVotes/totalVotes)
            const optionTwoPercentage = 100*(optionTwoVotes/totalVotes)
            const authedUserChoice = authedUser in question.optionOne.votes ? 'optionOne' : 'optionTwo'
            const optionOneBorder = ''
            const optionTwoBorder = ''

            if (authedUserChoice === 'optionOne'){
                optionOneBorder = 'primary'
                optionTwoBorder = ''
            } else {
                optionOneBorder = ''
                optionTwoBorder = 'primary' 
            }

            return (
                <div>
                    <Card className="text-center">
                        <Card.Header>Asked by AUTHOR</Card.Header>
                        <Col>
                            AUTHOR'S IMAGE
                        </Col>
                        <Col>
                            <Card.Body>
                                <Card.Title>Results: </Card.Title>
                                    <Card
                                        border={optionOneBorder} 
                                        style={{ width: '18rem' }}
                                        className="mb-2"
                                    >
                                        <Card.Body>
                                        <Card.Text>
                                            Would you rather {optionOneText}?
                                        </Card.Text>
                                        const progressInstance = <ProgressBar now={optionOnePercentage} label={`${optionOnePercentage}%`} />;
                                        render(progressInstance);
                                        </Card.Body>
                                    </Card>
                                    <br />
                                    <Card
                                        border={optionTwoBorder}
                                        style={{ width: '18rem' }}
                                        className="mb-2"
                                    >
                                        <Card.Body>
                                        <Card.Text>
                                            Would you rather {optionTwoText}?
                                        </Card.Text>
                                        const progressInstance = <ProgressBar now={optionTwoPercentage} label={`${optionTwoPercentage}%`} />;
                                        render(progressInstance);
                                        </Card.Body>
                                    </Card>
                            </Card.Body>
                        </Col>
                    </Card>
                </div>
            )
        } else {
            return (
                <div>
                    VOTE NOW
                </div>
            )
        }
    }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {

    const question = questions[id]

    return {
        id,
        authedUser,
        users,
        question: question
            ? question
            : null,
    }
}

export default connect(mapStateToProps)(Question)
