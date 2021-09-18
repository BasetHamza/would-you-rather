import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { handleInitialData } from '../actions/shared'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import NewQuestionPage from '../pages/NewQuestionPage'
import LeaderBoardPage from '../pages/LeaderBoardPage'
import QuestionPage from '../pages/QuestionPage'

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render () {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    {this.props.loading === true
                        ? null
                        : <div>
                            <Route path='/' exact component={LoginPage} />
                            <Route path='/home' exact component={HomePage} />
                            <Route path='/new' exact component={NewQuestionPage} />
                            <Route path='/leaderboard' exact component={LeaderBoardPage} />
                            <Route path='/question/:id' component={QuestionPage} />
                          </div>}
                </Fragment>
            </Router>
        )
    }
}

export default connect()(App)