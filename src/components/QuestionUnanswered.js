import React, { Component } from 'react'
import { connect } from 'react-redux'

import { handleAddAnswer } from '../actions/shared'

import { Card, Col, Row, Button, Form, Image } 
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
            <div style={{display: 'flex', justifyContent: 'center'}}  className="mt-5">
                <Card className="text-center" style={{ width: '50rem' }} >
                    <Row className="justify-content-md-center">
                        <Col md='3'>
                            <Image src={users[author].avatarURL} roundedCircle thumbnail/>
                        </Col>

                        <Card.Text style={{color:'blue', fontWeight:'bold', fontSize: 25}}>{users[author].name}</Card.Text>
                        <Card.Text style={{fontSize: 20, fontWeight:'bold'}}>asks:</Card.Text>

                        <Card.Text style={{color:'green', fontWeight:'bold', fontSize: 25}}>Would you rather ...</Card.Text>
                    </Row>
                    
                    <Card.Body>
                            <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                                <Col md={{ span: 6, offset: 3 }}>
                                    <Row>
                                        <Col>
                                            <Form.Check
                                            type="radio"
                                            label={optionOneText}
                                            name="formHorizontalRadios"
                                            id="optionOne"
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mt-3 mb-3">
                                        <Card.Text style={{color:'green', fontWeight:'bold', fontSize: 20}}>
                                            --OR--
                                        </Card.Text>     
                                    </Row>

                                    <Row>
                                        <Form.Check
                                        type="radio"
                                        label={optionTwoText}
                                        name="formHorizontalRadios"
                                        id="optionTwo"
                                        />
                                    </Row>
                                 </Col>             
                                <Button
                                    variant="primary"
                                    type='submit'
                                    disabled={this.state.answer === ''}
                                    className="mt-3"
                                >
                                    Submit Answer
                                </Button>
                             </Form>
                         </Card.Body>
                </Card>
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