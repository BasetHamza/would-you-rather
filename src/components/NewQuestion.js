import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

import { Card, Button, Col, Row } from 'react-bootstrap'

// This component has relied on the post:
// https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react


class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });
    }


    handleSubmit = (e) => {
        e.preventDefault()
    
        const { optionOne, optionTwo } = this.state
    
        // TODO: Add question to the store.
    
        console.log('New Question : ', optionOne, ' or ', optionTwo);
        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
        }))
    }

    render() {
        return (
            <div>
                <Card className="text-center">
                <Card.Header >Create New Question</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                </Card>
            </div>
        )
    }
}

export default connect()(NewQuestion)