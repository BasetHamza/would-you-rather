import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Col, Row, ProgressBar } 
    from 'react-bootstrap'

/**
 * This component renders the detailed view of an answered 
 * question.
 */

class QuestionAnswered extends Component {

    render() {        

        const { question, authedUser, users } = this.props

        const { author } = question
        const optionOneText = question.optionOne.text
        const optionTwoText = question.optionTwo.text
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length
        const totalVotes = optionOneVotes + optionTwoVotes
        const optionOnePercentage = 100*(optionOneVotes/totalVotes).toFixed(2)
        const optionTwoPercentage = 100*(optionTwoVotes/totalVotes).toFixed(2)
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
    }
}

function mapStateToProps ({ authedUser, users, questions }, props) {

    const id = props.id
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

export default connect(mapStateToProps)(QuestionAnswered)
