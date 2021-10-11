import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { NavLink, withRouter } from 'react-router-dom'

import { Navbar, Container, Nav, Button } from 'react-bootstrap'

/**
 * This componenet render the navigation bar which sits at the top of each Page
 * component in the ../pages directory.
 */
class NavigationBar extends Component{

    state = {
        logout: false,
    }

    logout = () => {
        const { dispatch } = this.props

        dispatch(setAuthedUser(""))

        this.setState(() => ({
            logout: true,
        }))
    }

    render(){
        const { logout } = this.state
        const { users, tabPath } = this.props


        console.log(logout);

        if (logout) {
            this.props.history.push('/login')
        }

        return(
            <div>
                <Navbar bg="light" variant="primary">
                    <Container>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav variant="pills" defaultActiveKey={tabPath}>
                                <Nav.Item>
                                    <Button variant='light' key='/'><NavLink to='/' exact activeClassName='active'>Home</NavLink></Button>
                                </Nav.Item>
                                <Nav.Item>
                                    <Button variant='light' key='/add'><NavLink to='/add' exact activeClassName='active'>New Question</NavLink></Button>
                                </Nav.Item>
                                <Nav.Item>
                                    <Button variant='light' key='/leaderboard'><NavLink to='/leaderboard' exact activeClassName='active'>Leader Board</NavLink></Button>
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
                                        onClick={this.logout    }
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

export default withRouter(connect(mapStateToProps)(NavigationBar))
