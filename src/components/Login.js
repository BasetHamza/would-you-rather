import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter, Redirect } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import { Button, Dropdown, DropdownButton, Image, Col, Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css' 


/**
 * This componenet renders the Login form of the LoginPage component.
 * 
 * It allows the user to choose the name from a drop-down menue. Each user 
 * is represented by an avatar and name. It also has a reset choice to remove
 * a chosen user. Once the user is selected, it will activate the Log In button
 * which will then direct the user to the router to use the application and view
 * the different tabs.
 */
class Login extends Component {

    state = {
        selection: '',
        isLoggedIn: false,
    }
    
    updateSelection = (e) => {
        this.setState(() => ({
            selection: e
        }))
    }

    resetAuthedUser = () => {
        
        const { dispatch } = this.props

        this.setState(() => ({
            selection: ""
        }))

        dispatch(setAuthedUser(""))  
    }

    handleSignIn = (e) => {
        e.preventDefault()
    
        const { selection } = this.state
        const { dispatch } = this.props
    
        dispatch(setAuthedUser(selection))

        this.setState(() => ({
            isLoggedIn: true,
        }))
    }
      
    render(){
        const { selection, isLoggedIn } = this.state
        const { users } = this.props
        const { from } = this.props.location.state || { from: { pathname: '/' } }

        if (isLoggedIn === true) {
            return <Redirect to={from.pathname}/>
        }

        return (
            <div className="col-xs-1 mt-5" align="center">

                <Card style={{ width: '40rem' }} className="text-center" bg='light'>

                    <Card.Header style={{fontSize: 25}}>Welcome to <strong>Would You Rather App ... ?</strong></Card.Header>

                    <Card.Body className="d-grid gap-5">
                        
                        <Card.Title style={{fontSize: 20}}>
                            Please sign in below to continue!
                        </Card.Title>
                        
                        {/* <select 
                            value={selection} 
                            onChange={this.updateSelection}
                        >
                            <option value="Select User">Select User</option>
                            {
                                this.props.userIds.map((id) => (
                                    <option 
                                        key={users[id].id} 
                                        value={users[id].id}
                                    >
                                        {users[id].name}
                                    </option>
                                )    
                                )
                            }
                         </select> */}

                        <DropdownButton 
                            id="dropdown-basic-button" 
                            title={selection !== "" ? users[selection].name : "Select User"} 
                            size="lg"
                            onSelect={this.updateSelection}
                        >
                            {this.props.userIds.map((id) => (
                                <div 
                                    className="align-items-center" 
                                    key={users[id].id}
                                >
                                    <Dropdown.Item 
                                        key={users[id].id} 
                                        eventKey={users[id].id}
                                        size="lg"
                                    >
                                        <Row className="align-items-center">
                                            <Col md='3'>
                                                <Image src={users[id].avatarURL} roundedCircle thumbnail/>
                                            </Col>
                                            <Col>
                                                {users[id].name}
                                            </Col>
                                        </Row>
                                    </Dropdown.Item>
                                </div>
                            ))}

                            <Dropdown.Divider />

                            <Dropdown.Item
                                key="Select User"
                                eventKey="Select User"
                                size="lg"
                                onSelect={this.resetAuthedUser}
                            >
                                <Col>
                                    Clear Selection
                                </Col>
                            </Dropdown.Item>

                        </DropdownButton>
                        
                        <div className="col text-center">
                            <Button
                                className="w-50"
                                variant="success"
                                size="lg"
                                type='submit'
                                onClick={this.handleSignIn}
                                disabled={selection === 'Select User' || selection === ''}
                            >
                                Sign In
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
    return {
        users,
        userIds: Object.keys(users)
    }
}

export default withRouter(connect(mapStateToProps)(Login))