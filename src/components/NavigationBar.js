import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { NavLink } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

import { Navbar, Container, Nav, Button } from 'react-bootstrap'

/**
 * This componenet render the navigation bar which sits at the top of each Page
 * component in the ../pages directory.
 */
class NavigationBar extends Component{

    resetAuthedUser = () => {
        const { dispatch } = this.props

        dispatch(setAuthedUser(""))

        return <Redirect to='/' />
    }

    render(){
        
        const { users, tabPath } = this.props

        return(
            <div>
                <Navbar bg="light" variant="primary">
                    <Container>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav variant="pills" defaultActiveKey={tabPath}>
                                <Nav.Item>
                                    <Nav.Link key='/home'><NavLink to='/home' exact activeClassName='active'>Home</NavLink></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link key='/new'><NavLink to='/new' exact activeClassName='active'>New Question</NavLink></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link key='/leaderboard'><NavLink to='/leaderboard' exact activeClassName='active'>Leader Board</NavLink></Nav.Link>
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

    const {tabPath} = props && Object.keys(props).length === 0 && props.constructor === Object
    ? ""
    : props.match.params

    return {
        authedUser,
        users,
        tabPath,
    }
}

export default connect(mapStateToProps)(NavigationBar)
