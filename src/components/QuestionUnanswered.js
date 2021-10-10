import React, { Component } from 'react'
import { connect } from 'react-redux'

import { handleAddAnswer } from '../actions/shared'

import { Card, Col, Row, Button, Form } 
    from 'react-bootstrap'

/**
 * This component renders the detailed view of an unanswered 
 * question.
 */

class QuestionUnanswered extends Component {

    state = {
        answer: '',
    }

    handleChange = (e) => {
        this.setState(() => ({
            answer: e.target.id
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { answer } = this.state
        const { dispatch, id } = this.props

        dispatch(handleAddAnswer(id, answer))

        this.setState(() => ({
            toHome: true,
        }))
    }

    render () {

        const { question, users } = this.props

        const { author } = question
        const optionOneText = question.optionOne.text
        const optionTwoText = question.optionTwo.text

        return (
            <div>
                <Row className="justify-content-md-center">
                    <Card className="text-center" style={{ width: '50rem' }} >
                        <Card.Header ><h3>{users[author].name} Asks:</h3></Card.Header>
                        <Row className="align-items-center">
                            <Col md='3'>
                                <Card.Img variant="left" src={users[author].avatarURL} />
                            </Col>
                        </Row>
                        <Card.Body>
                            <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                                <Card.Text>
                                    Would you rather ...
                                </Card.Text>
                                <Col sm={10}>
                                        <Form.Check
                                        type="radio"
                                        label={optionOneText}
                                        name="formHorizontalRadios"
                                        id="optionOne"
                                        />
                                        <Form.Check
                                        type="radio"
                                        label={optionTwoText}
                                        name="formHorizontalRadios"
                                        id="optionTwo"
                                        />
                                </Col>             
                                <Button 
                                    variant="primary"
                                    type='submit' 
                                    disabled={this.state.answer === ''}
                                >
                                    Submit Answer
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, users, questions }, props) {

    const id  = props.id
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

export default connect(mapStateToProps)(QuestionUnanswered)