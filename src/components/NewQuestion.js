import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'

import { Card, Button, Row, Form } from 'react-bootstrap'

/**
 * This component renders the new question form used by the user to ask a question.
 * 
 * This component has used the following post to learn how to handle multiple inputs using the
 * same onChange function:
 * https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
 * 
 */

class NewQuestion extends Component {

    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false,
    }

    handleChange = (e) => {
        const value = e.target.value;

        this.setState(() => ({
            ...this.state,
            [e.target.name]: value
        }));
    }

    handleSubmit = (e) => {
        e.preventDefault()
    
        const { optionOneText, optionTwoText } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(optionOneText,optionTwoText))
    
        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
            toHome: true,
        }))
    }

    render() {

        const { optionOneText, optionTwoText, toHome } = this.state        

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <Row className="justify-content-md-center">
                    <Card className="text-center" style={{ width: '50rem' }} >
                        <Card.Header ><h3>Create New Question</h3></Card.Header>
                    
                        <Card.Body>
                            <Form onSubmit={this.handleSubmit}>
                    
                                <Card.Text>
                                    Complete the question.
                                </Card.Text>
                    
                                <Card.Text>
                                    Would you rather ...
                                </Card.Text>
                    
                                <Form.Control
                                    className="mb-3" 
                                    name="optionOneText" 
                                    as='textarea'
                                    type="text" 
                                    placeholder="Enter Option One Text Here" 
                                    value={optionOneText}
                                    onChange={this.handleChange}
                                />
                    
                                <Card.Text className="font-weight-bold">
                                    -OR-
                                </Card.Text>
                    
                                <Form.Control 
                                    className="mb-3" 
                                    name="optionTwoText"
                                    as='textarea'
                                    type="text" 
                                    placeholder="Enter Option Two Text Here" 
                                    value={optionTwoText}
                                    onChange={this.handleChange}
                                />                    
                    
                                <Button 
                                    variant="primary"
                                    type='submit' 
                                    disabled={optionOneText === '' || optionTwoText === ''}
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