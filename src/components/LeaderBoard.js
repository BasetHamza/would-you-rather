import React, { Component } from 'react'
import { connect } from 'react-redux'

import NavigationBar from '../components/NavigationBar'
import LeaderBoardUserCard from './LeaderBoardUserCard';

class LeaderBoard extends Component {
    render(){

        const { users, rankedUserIDs } = this.props

        console.log(this.props);

        return(
            <div>
                <ul>
                {
                    rankedUserIDs.map((userID) => (
                        <LeaderBoardUserCard match={{params: {userID}}}/>
                    )) 
                }
                </ul>
            </div>
        )
    }
}

function mapStateToProps( { users } ) {

    return {
        users,
        rankedUserIDs: Object.keys(users)
                .sort((a,b) => (users[b].questions.length + Object.keys(users[b].answers).length) 
                    - (users[a].questions.length + Object.keys(users[a].answers).length))
    }
}


export default connect(mapStateToProps)(LeaderBoard)