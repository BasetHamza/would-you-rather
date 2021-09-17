import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Button, Col, Row, Alert } from 'react-bootstrap'

// A component that will render a question card to be displayed under the answered or unanswered Questions

class Question extends Component {
    render() {        
        const { question, users } = this.props

        if (question === null) {
            return (
                <Alert key='questionNotFound' variant='warning'>
                    This question doesn't exist!
                </Alert>
            )
        }

        const { author } = question
        const optionOneText = question.optionOne.text

        return (
            <div>
                <Card style={{ width: '50rem' }}>
                <Row className="justify-content-md-center">
                    <Card.Header>{users[author].name} asks:</Card.Header>
                        <Col xs lg="2">
                            <Card.Img variant="left" src={users[author].avatarURL} />
                        </Col>
                        <Col >
                            <Card.Body>
                                <Card.Title>Would you rather...</Card.Title>
                                    <Card.Text>
                                        ...{optionOneText}...
                                    </Card.Text>
                                <Button variant="primary">View Poll</Button>
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

export default connect(mapStateToProps)(Question)
