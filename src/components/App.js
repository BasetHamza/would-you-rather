import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Redirect, Route, Switch } from 'react-router-dom'

import { handleInitialData } from '../actions/shared'

import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import NewQuestionPage from '../pages/NewQuestionPage'
import LeaderBoardPage from '../pages/LeaderBoardPage'
import QuestionPage from '../pages/QuestionPage'
import NotFound from '../pages/NotFound'

import ProtectedRoute from '../utils/ProtectedRoute'


class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render () {

        return (
            <Fragment>
                <LoadingBar />
                {this.props.loading === true
                    ? null
                    : 
                        <div>
                            <Switch>
                                <Route 
                                    exact 
                                    path='/login' 
                                    name="Login Page" 
                                    render={(props) => <LoginPage {...props} />}
                                />
                                <ProtectedRoute 
                                    exact
                                    path='/' 
                                    name="Home Page"
                                    component={HomePage} 
                                />
                                <ProtectedRoute 
                                    exact 
                                    path='/new' 
                                    name="New Question"
                                    component={NewQuestionPage} 
                                />
                                <ProtectedRoute 
                                    path='/leaderboard' 
                                    name="Leader Board"
                                    component={LeaderBoardPage} 
                                />
                                <ProtectedRoute 
                                    path='/question/:id'
                                    name="Question Details" 
                                    component={QuestionPage} 
                                />
                                <Route path="/404" component={NotFound} />
                                <Redirect to="/404" />
                            </Switch>
                        </div>         
                        }
            </Fragment>
            )

    }
}

export default connect()(App)