import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Tabs, Tab, Container } from 'react-bootstrap'

import NavigationBar from '../components/NavigationBar'
import QuestionsList from '../components/QuestionsList'

class HomePage extends Component {
    render() {
        return(
            <div>
                <NavigationBar />
                <Container>
                    <Tabs variant="pills" defaultActiveKey="unanswered" id="uncontrolled-tab-example" className="mb-5" fill >
                        <Tab eventKey="unanswered" title="Unanswered Questions">
                            <QuestionsList match={{params: {tabID: 'unanswered'}}}/>
                        </Tab>
                        <Tab eventKey="answered" title="Answered Questions">
                            <QuestionsList match={{params: {tabID: 'answered'}}}/>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        )
    }
}

export default connect()(HomePage)