import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

import { handleInitialData } from '../actions/shared'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render () {
        return (
            <div>
                <HomePage />
            </div>
        )
    }
}

export default connect()(App)