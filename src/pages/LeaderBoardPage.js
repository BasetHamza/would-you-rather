import React, { Component } from 'react'
import NavigationBar from '../components/NavigationBar'

class LeaderBoardPage extends Component{
    render(){
        return(
            <div>
                <NavigationBar match={{params: {tabPath: '/leaderboard'}}}/>
            </div>
        )
    }
}

export default LeaderBoardPage