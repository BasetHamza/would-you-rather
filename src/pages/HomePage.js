import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Tabs, Tab, Container, Card } from 'react-bootstrap'

// import NavigationBar from '../components/NavigationBar'
import QuestionsList from '../components/QuestionsList'

class HomePage extends Component {
    render() {
        return(
            <div>
                {/* <NavigationBar match={{params: {tabPath: '/home'}}}/> */}
                <Container>
                    <Card bg='light' style={{ width: '55rem' }}>
                        <Card.Body>
                            <Tabs variant="pills" defaultActiveKey="unanswered" id="uncontrolled-tab-example" className="mb-5" fill >
                                <Tab eventKey="unanswered" title="Unanswered Questions">
                                    <QuestionsList tabID={'unanswered'}/>
                                </Tab>
                                <Tab eventKey="answered" title="Answered Questions">
                                    <QuestionsList tabID={'answered'}/>
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default connect()(HomePage)