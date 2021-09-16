import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

import Card from 'react-bootstrap/Card'
import { Button, Dropdown, DropdownButton, Image, Col, Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css' 

class Login extends Component {

    state = {
        selection: '',
    }
    
    handleSelect =(e)=>{
        console.log(e);
        this.setState(() => ({
            e
        }))
    }

    handleSignIn = (e) => {
        e.preventDefault()
    
        const { selection } = this.state
        const { dispatch } = this.props
    
        dispatch(setAuthedUser(selection))    
    }
      
    render(){
        console.log(this.props);

        const { selection } = this.state
        const {users} = this.props

        return (
            <div class="col-xs-1" align="center">

                <Card style={{ width: '40rem' }} className="text-center " bg='light'>

                    <Card.Header>Welcome to <strong>Would You Rather App ... ?</strong></Card.Header>

                    <Card.Body className="d-grid gap-5">
                        
                        <Card.Title>
                            Please sign in below to continue!
                        </Card.Title>
                        
                        <DropdownButton 
                            id="dropdown-basic-button" 
                            title="Select User" 
                            size="lg"
                            onSelect={this.handleSelect}
                        >

                            {this.props.userIds.map((id) => (
                                <div className="align-items-center">
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
                        </DropdownButton>
                        
                        <Button 
                            variant="success" 
                            size="lg"
                            type='submit'
                            onClick={this.handleSignIn}
                            disabled={selection === ''}
                        >
                            Sign In
                        </Button>
                    
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

export default connect(mapStateToProps)(Login)