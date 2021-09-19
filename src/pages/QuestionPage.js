import React, { Component } from 'react'
import NavigationBar from '../components/NavigationBar'
import { connect } from 'react-redux'

import Question from '../components/Question'

class QuestionPage extends Component{
    render(){

        const { id } = this.props.computedMatch.params

        return(
            <div>
                <NavigationBar />
                <Question match={{params: {id: id}}}/>
            </div>
        )
    }
}

// function mapStateToProps (props) {
//   const { id } = this.props
//   console.log("ID in QUestion Page:", id)
//   return {
//     id,
//   }
// }

export default connect()(QuestionPage)