import React, { Component } from 'react'
import NavigationBar from '../components/NavigationBar'
import NewQuestion from '../components/NewQuestion'

class NewQuestionPage extends Component{
    render(){
        return(
            <div>
                <NavigationBar match={{params: {tabPath: '/new'}}}/>
                <NewQuestion />
            </div>
        )
    }
}

export default NewQuestionPage