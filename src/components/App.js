import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

import { handleInitialData } from '../actions/shared'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import NewQuestionPage from '../pages/NewQuestionPage'
import LeaderBoardPage from '../pages/LeaderBoardPage'

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render () {
        return (
            <div>
                <LeaderBoardPage />
            </div>
        )
    }
}

export default connect()(App)