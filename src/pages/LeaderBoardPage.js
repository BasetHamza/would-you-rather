import React, { Component } from 'react'
import NavigationBar from '../components/NavigationBar'
import LeaderBoard from '../components/LeaderBoard'

class LeaderBoardPage extends Component{
    render(){
        return(
            <div>
                {/* <NavigationBar match={{params: {tabPath: '/leaderboard'}}}/> */}
                <LeaderBoard />
            </div>
        )
    }
}

export default LeaderBoardPage