import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class ProtectedRoute extends Component {

  render() {
    const authedUser = this.props.authedUser 
    const { component: Component, exact, path } = this.props
    
    if (authedUser !== "") {
      return (
        <Route
          exact={exact}
          path={path}
          render={() => <Component {...this.props}/>}
        />
      )
    } else {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: this.props.location },
          }}
        />
      )
    }
  }

}


function mapStateToProps ( {authedUser} , props) {
    return {
        authedUser,
        props
    }
}

export default connect(mapStateToProps)(ProtectedRoute)



// import React from 'react'
// import { Redirect, Route } from 'react-router-dom'
// import { connect } from 'react-redux'

// const ProtectedRoute = ({ component: Component, exact, path }) => (
//   <Route
//     exact={exact}
//     path={path}
//     render={(props) =>
//       props.authedUser !== "" ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: '/login',
//             state: { from: props.location },
//           }}
//         />
//       )
//     }
//   />
  
// )

// function mapStateToProps ({ authedUser}, props) {

//   console.log({
//         authedUser: authedUser ? authedUser : "",
//         props,
//     });
//     return {
//         authedUser: authedUser ? authedUser : "",
//         props,
//     }
// }

// export default connect(mapStateToProps)(ProtectedRoute)
