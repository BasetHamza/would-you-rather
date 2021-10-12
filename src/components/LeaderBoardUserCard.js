import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Col, Row, Image, Table } from 'react-bootstrap'

/**
 * This component renders the user's card in the leader board page.
 * 
 * It serves the LeaderBoard componenet.
 */

class LeaderBoardUserCard extends Component {
    render() {

        const { users , userID } = this.props

        return (
            <div style={{display: 'flex', justifyContent: 'center'}} className="mt-3">
                <Card className="text-center" style={{ width: '50rem' }} bg='light' border="secondary">
                    <Card.Body>
                            <Row>
                                <Col md='3'>
                                    <Image src={users[userID].avatarURL} roundedCircle thumbnail/>
                                </Col>
                                <Col className="mt-4">
                                    <Card.Text style={{color:'blue', fontWeight:'bold', fontSize: 20}}>{users[userID].name}</Card.Text>
                                    <Table striped bordered hover style={{fontWeight:'bold', fontSize: 15}}>
                                        <tbody>
                                            <tr>
                                            <td>Answered</td>
                                            <td>Asked</td>
                                            </tr>
                                            <tr>
                                            <td>{Object.keys(users[userID].answers).length}</td>
                                            <td>{users[userID].questions.length}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col className="mt-5">
                                    <Card.Text style={{color:'orange', fontWeight:'bold', fontSize: 20}}>Score</Card.Text>
                                    <Card.Text style={{color:'black', fontWeight:'bold', fontSize: 20}}>{Object.keys(users[userID].answers).length + users[userID].questions.length}</Card.Text>
                                </Col>
                            </Row>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

function mapStateToProps( { users } , { userID }) {
    
    return {
        userID,
        users,
    }
}

export default connect(mapStateToProps)(LeaderBoardUserCard)