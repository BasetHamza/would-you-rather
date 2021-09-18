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
            const authedUserChoice = question.optionOne.votes.includes(authedUser) ? 'optionOne' : 'optionTwo'
            let optionOneBorder = ''
            let optionTwoBorder = ''

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
                        <Card.Header>Asked by {users[author].name}</Card.Header>
                        <Col>
                            <Card.Img variant="left" src={users[author].avatarURL} />
                        </Col>
                        <Row className="justify-content-md-center">
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
                                            <ProgressBar now={optionOnePercentage} />
                                            <Card.Text>
                                                {optionOnePercentage}%
                                            </Card.Text>
                                            <Card.Text>
                                                {optionOneVotes} out of {totalVotes} votes
                                            </Card.Text>
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
                                        <ProgressBar now={optionTwoPercentage} />
                                        <Card.Text>
                                            {optionTwoPercentage}%
                                        </Card.Text>
                                        <Card.Text>
                                            {optionTwoVotes} out of {totalVotes} votes
                                        </Card.Text>
                                        </Card.Body>
                                    </Card>
                            </Card.Body>
                        </Row>
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
