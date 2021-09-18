import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Button, Col, Row, CardColumns } from 'react-bootstrap'

/**
 * This component renders the user card in the leader board page.
 */

class LeaderBoardUserCard extends Component {
    render() {

        const { users , userID } = this.props

        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Card className="text-center" style={{ width: '50rem' }}>
                    <Card.Body>
                            <Row>
                                <Col xs={6} md={4}><Card.Img roundedCircle variant="left" src={users[userID].avatarURL} /></Col>
                                    <Col>

                                        <Card.Title>{users[userID].name}</Card.Title>
                                        <Card.Text>
                                            Answered Questions: {Object.keys(users[userID].answers).length}
                                        </Card.Text>
                                        <Card.Text>
                                            Created Questions: {users[userID].questions.length}
                                        </Card.Text>
                                    </Col>
                                <Col>
                                  <Card.Footer className="text-muted">Score: {Object.keys(users[userID].answers).length + users[userID].questions.length}</Card.Footer>
                                </Col>
                            </Row>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}

function mapStateToProps( { users } , props) {

    const {userID} = props.match.params

    return {
        userID,
        users,
    }
}

export default connect(mapStateToProps)(LeaderBoardUserCard)