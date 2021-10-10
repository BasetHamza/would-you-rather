import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { handleAddAnswer } from '../actions/shared'

import { Card, Button, Col, Row, Alert, ProgressBar, Form } 
    from 'react-bootstrap'

/*
 * A component that will render a detailed question card 
 * to be displayed when the "View Poll" button is clicked.
 * The view will differ based on the question being answered or not
 */

class Question extends Component {

    state = {
        answer: '',
        toHome: false,
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

    render() {        
        
        const { question, authedUser, users, id, toHome} = this.props

        /*
         * The required behavior was to stay on the same question page and show the results.
         * The behavior was achieved unintentionally due to a mistake in my code.
         * The mistake was that I did not use the state toHome properly.
         * Fixed the error from using toHome to this.state.toHome, so not it takes me to home after answering the question.
         * Since this is not the required behavior, I have commented this part to prevent redirecting the user.
         */
        
        // if (this.state.toHome === true) {
        //     return <Redirect to='/' />
        // }

        if (question === null){
            return (
                <Alert key='questionNotFound' variant='warning'>
                    This question doesn't exist!
                </Alert>
            )
        }

        const { author } = question
        const optionOneText = question.optionOne.text
        const optionTwoText = question.optionTwo.text

        /*
         * Checking if the authedUser has already answered the question or not
         * This will decide which kind of question card we will render. 
         * If already answered, we render a card that shows the result, if not
         * answered, then we render a card that takes input from the user.
         */
        
        if (id in users[authedUser].answers ){


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
        } else {
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
