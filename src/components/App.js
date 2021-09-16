import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

import { handleInitialData } from '../actions/shared'
import Login from '../components/Login'

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render () {
        return (
            <div>
                <Login />
            </div>
        )
    }
}

export default connect()(App)