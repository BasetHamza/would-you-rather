import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const ProtectedRoute = ({ component: Component, exact, path }) => (

    // const { authedUser } = this.props

  <Route
    exact={exact}
    path={path}
    render={(props) =>
      props.authedUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
  
)

function mapStateToProps ({ authedUser}, props) {

    return {
        authedUser,
        props,
    }
}

export default connect(mapStateToProps)(ProtectedRoute)
