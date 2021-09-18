import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

import { Navbar, Container, Nav, Button } from 'react-bootstrap'

class NavigationBar extends Component{

    resetAuthedUser = () => {
        const { dispatch } = this.props

        dispatch(setAuthedUser(""))
    }

    render(){
        
        const { users, tabPath } = this.props

console.log(tabPath);

        return(
            <div>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav variant="pills" defaultActiveKey={tabPath}>
                                <Nav.Item>
                                    <Nav.Link href="/home">Home</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="/new">New Question</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="/leaderboard">Leader Board</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>

                        {/* Only show the welcome message and the logout 
                            button if we have an authedUser */}

                        {
                            this.props.authedUser !== "" && (
                                <Navbar.Collapse>
                                    <Navbar.Collapse>
                                        <Navbar.Text>
                                            Hello, <strong>{users[this.props.authedUser].name}</strong>
                                        </Navbar.Text>
                                    </Navbar.Collapse>

                                    <Button 
                                        className="btn btn-outline-primary mr-1" 
                                        variant="warning"
                                        onClick={this.resetAuthedUser}
                                    >
                                        Logout
                                    </Button>
                                </Navbar.Collapse>
                            )
                        }
                    </Container>
                </Navbar>
            </div>
        )
    }
}


function mapStateToProps ({ authedUser, users }, props) {
    
    const {tabPath} = props.match.params

    return {
        authedUser,
        users,
        tabPath,
    }
}

export default connect(mapStateToProps)(NavigationBar)
