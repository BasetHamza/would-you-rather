import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

import { Card, Button, Row, Form } from 'react-bootstrap'

// This component has relied on the post:
// https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react


class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
    }

    handleChange = (e) => {
        const value = e.target.value;

        console.log(value);
        this.setState(() => ({
            ...this.state,
            [e.target.name]: value
        }));
    }


    handleSubmit = (e) => {
        e.preventDefault()
    
        const { optionOne, optionTwo } = this.state
        const { dispatch, id } = this.props

        dispatch(handleAddQuestion(optionOne,optionOne))
    
        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
        }))
    }

    render() {

        const { optionOne, optionTwo } = this.state

        {
            // todo: redirect to / if submitted. 
        }

        return (
            <div>
                <Row className="justify-content-md-center">
                    <Card className="text-center" style={{ width: '50rem' }} >
                        <Card.Header ><h3>Create New Question</h3></Card.Header>
                    
                        <Card.Body>
                            <Form onSubmit={this.handleSubmit}>
                    
                                <Card.Text className="text-md-right">
                                    Complete the question.
                                </Card.Text>
                    
                                <Card.Text >
                                    <h4>Would you rather ...</h4>
                                </Card.Text>
                    
                                <Form.Control
                                    className="mb-3" 
                                    name="optionOne" 
                                    as='textarea'
                                    type="text" 
                                    placeholder="Enter Option One Text Here" 
                                    value={optionOne}
                                    onChange={this.handleChange}
                                />
                    
                                <Card.Text >
                                    <h5>-OR-</h5>
                                </Card.Text>
                    
                                <Form.Control 
                                    className="mb-3" 
                                    name="optionTwo"
                                    as='textarea'
                                    type="text" 
                                    placeholder="Enter Option Two Text Here" 
                                    value={optionTwo}
                                    onChange={this.handleChange}
                                />                    
                    
                                <Button 
                                    variant="primary"
                                    type='submit' 
                                    disabled={optionOne === '' || optionTwo === ''}
                                >
                                    Submit New Question
                                </Button>
                    
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </div>
        )
    }
}

export default connect()(NewQuestion)