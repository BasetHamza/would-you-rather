import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Button, Col, Row, Alert } from 'react-bootstrap'

/*
 * A component that will render a detailed question card 
 * to be displayed when the "View Poll" button is clicked.
 * The view will differ based on the question being answered or not
 */

class Question extends Component {
    render() {        
        return (
            <div>

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
