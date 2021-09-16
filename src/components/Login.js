import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Card, Dropdown, DropdownButton } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css' 

class Login extends Component {
    render(){
        console.log(this.props.users);

        const {users} = this.props

        return (
            <div>
                <Card className="text-center">
                    <Card.Header>Welcome to Would You Rather App ...?</Card.Header>
                        <Card.Body>
                            <Card.Title>Please Sign in to continue!</Card.Title>
                            <DropdownButton id="dropdown-basic-button" title="Select User" >
                                {this.props.userIds.map((id) => (
                                    <Dropdown.Item key={users[id].id}>{users[id].name}</Dropdown.Item>
                                ))}

                            </DropdownButton>


                            <Button variant="success">Sign In</Button>
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