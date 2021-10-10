import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import { Card, Button, Col, Row, Alert } from 'react-bootstrap'

/**
 * A component that will render a question card to be displayed under the answered or unanswered 
 * question lists
 */

class QuestionCard extends Component {

    toQuestion = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/questions/${id}`)
    }

    render() {        
        const { question, users, id} = this.props

        if (question === null) {
            return (
                <Alert key='questionNotFound' variant='warning'>
                    This question doesn't exist!
                </Alert>
            )
        }

        const { author } = question
        
        /*
         * We need this since the Question card only shows the first option as a teaser.
         * User can click the card for a detailed view.
         */
        const optionOneText = question.optionOne.text

        return (
            <div>
                <Card style={{ width: '50rem' }}>
                <Row className="justify-content-md-center">
                    {/* <Card.Header>USER_NAME asks:</Card.Header> */}
                    <Card.Header>{users[author].name} asks:</Card.Header>
                        <Col xs lg="2">
                            <Card.Img variant="left" src={users[author].avatarURL} />
                            {/* <Card.Img variant="left" src="" /> */}
                        </Col>
                        <Col >
                            <Card.Body>
                                <Card.Title>Would you rather...</Card.Title>
                                    <Card.Text>
                                        ...{optionOneText}...
                                    </Card.Text>
                                <Button 
                                    variant="primary"
                                    onClick={(e) => this.toQuestion(e, id)}
                                >
                                    View Poll
                                </Button>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {

    const question = questions[id]

    return {
        authedUser,
        users,
        question,
    }
}

export default withRouter(connect(mapStateToProps)(QuestionCard))
