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

    // state = {
        /*
         * It turns out that keeping the logout state caused a problem of infinitly reloading the login
         * page causing the state to be set to false infinitly which led to the program to crash.
         * Removing logout fixed the issue and caused the app to operate correctly since the authedUser is
         * already reset which automatically loads the login page (most likely because of the way the protected route
         * is implemented)
         */
        //     logout: false,
    // }

    logout = () => {
        const { dispatch } = this.props

        dispatch(setAuthedUser(""))

        // this.setState(() => ({
        //     logout: true,
        // }))
    }

    render(){
        // const { logout } = this.state
        // const { users, tabPath } = this.props
        const { users } = this.props
        const { tabPath } = this.props.location.pathname


        // if (logout) {
        //     this.props.history.push('/login')
        // }

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
                                        onClick={this.logout}
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

    /*
     * Since we placed a single navigation bar in the App component instead of one in each view.
     * Now, we have to figure out a way to detect which path we are in since we do not have the 
     * tabPath anymore.
     */

    // const {tabPath} = props && Object.keys(props).length === 0 && props.constructor === Object
    // ? ""
    // : props.match.params

    return {
        authedUser,
        users,
        // tabPath,
    }
}

export default withRouter(connect(mapStateToProps)(NavigationBar))
