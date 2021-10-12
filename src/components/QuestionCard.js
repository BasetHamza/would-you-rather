import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import { Card, Button, Col, Row, Alert, Image } from 'react-bootstrap'

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
            <div className='mt-4'>
                <Card style={{ width: '50rem' }}>
                    <Row>
                        <Col md="2">
                            <Image src={users[author].avatarURL} roundedCircle thumbnail/>
                        </Col>
                            <Col md="3" className='mt-4'>
                                <Row>{users[author].name} asks:</Row>
                                <Row>{users[author].name} asks:</Row>
                            </Col>
                    

                {/* <Row className="justify-content-md-center"> */}
                        <Col>
                                <Card.Title>Would you rather...</Card.Title>
                                    <Card.Text>
                                        ...{optionOneText}...
                                    </Card.Text>
                                                            </Col>
                        <Col>

                                <Button 
                                    variant="primary"
                                    onClick={(e) => this.toQuestion(e, id)}
                                >
                                    View Poll
                                </Button>
                        </Col>
                                            </Row>

                    {/* </Row> */}
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
