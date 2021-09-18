import React, { Component } from 'react'
import NavigationBar from '../components/NavigationBar'
import { connect } from 'react-redux'

import Question from '../components/Question'

class QuestionPage extends Component{
    render(){

        const { id } = this.props.match.params

        return(
            <div>
                <NavigationBar />
                <Question match={{params: {id: id}}}/>
            </div>
        )
    }
}

export default connect()(QuestionPage)