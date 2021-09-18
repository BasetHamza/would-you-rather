import React, { Component } from 'react'
import { connect } from 'react-redux'

import LeaderBoardUserCard from './LeaderBoardUserCard';

/**
 * This component renders the leader board section of the leader board page.
 * 
 * It is responsible for retreiving the ranked data of the users and use the 
 * "LeaderBoardUserCard" component to create a card for each user with the 
 * realtive information such as the the questions asked, answered, and total score.
 */

class LeaderBoard extends Component {
    render(){

        const { rankedUserIDs } = this.props

        console.log(this.props);

        return(
            <div>
                <ul>
                {
                    rankedUserIDs.map((userID) => (
                        <li key={userID}>
                            <LeaderBoardUserCard userID={userID}/>
                        </li>
                    )) 
                }
                </ul>
            </div>
        )
    }
}

function mapStateToProps( { users } ) {
    return {
        rankedUserIDs: Object.keys(users)
                .sort((a,b) => (users[b].questions.length + Object.keys(users[b].answers).length) 
                    - (users[a].questions.length + Object.keys(users[a].answers).length))
    }
}

export default connect(mapStateToProps)(LeaderBoard)