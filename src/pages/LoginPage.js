import React, { Component } from 'react'
import Login from '../components/Login'
// import NavigationBar from '../components/NavigationBar'

class LoginPage extends Component{
    render(){
        return(
            <div>
                {/* <NavigationBar /> */}
                <Login />
            </div>
        )
    }
}

export default LoginPage