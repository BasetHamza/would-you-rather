import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Col, Row, ProgressBar, Image, Container } 
    from 'react-bootstrap'

/**
 * This component renders the detailed view of an answered 
 * question.
 */

class QuestionAnswered extends Component {

    render() {        

        const { question, authedUser, users } = this.props

        const { author } = question
        const optionOneText = question.optionOne.text
        const optionTwoText = question.optionTwo.text
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length
        const totalVotes = optionOneVotes + optionTwoVotes
        const optionOnePercentage = 100*(optionOneVotes/totalVotes).toFixed(2)
        const optionTwoPercentage = 100*(optionTwoVotes/totalVotes).toFixed(2)
        const authedUserChoice = question.optionOne.votes.includes(authedUser) ? 'optionOne' : 'optionTwo'
        let optionOneBorder = ''
        let optionTwoBorder = ''
        let optionOneTextColor = ''
        let optionTwoTextColor = ''

        if (authedUserChoice === 'optionOne'){
            optionOneBorder = 'primary'
            optionTwoBorder = ''
            optionOneTextColor = 'blue'
            optionTwoTextColor = 'black'
        } else {
            optionOneBorder = ''
            optionTwoBorder = 'primary' 
            optionOneTextColor = 'black'
            optionTwoTextColor = 'blue'
        }

        console.log(optionOneTextColor);

        return (
            <div style={{display: 'flex', justifyContent: 'center'}}  className="mt-5">
                <Card className="text-center" style={{ width: '50rem' }} >
                    <Row className="justify-content-md-center">
                        <Col md='3'>
                            <Image src={users[author].avatarURL} roundedCircle thumbnail/>
                        </Col>

                        <Card.Text style={{color:'blue', fontWeight:'bold', fontSize: 25}}>{users[author].name}</Card.Text>
                        <Card.Text style={{fontSize: 20, fontWeight:'bold'}}>asks:</Card.Text>

                        <Card.Text style={{color:'green', fontWeight:'bold', fontSize: 25}}>Would you rather ...</Card.Text>
                    </Row>

                    {/* Option 1 */}

                    <Row className="justify-content-md-center mt-3">
                        <Card
                               border={optionOneBorder} 
                               style={{ width: '35rem' }}
                               className="text-center mb-2"
                               bg="light"
                           >
                               <Card.Body>
                                   <Card.Text style={{color:optionOneTextColor, fontWeight:'bold', fontSize: 20}}>
                                       ...{optionOneText}?
                                   </Card.Text>
                                   <Container>
                                       <Row>
                                           <Col sm={10}>
                                               <ProgressBar striped now={optionOnePercentage} />
                                           </Col>
                                           <Col sm={2}>
                                               <Card.Text>
                                                   {optionOnePercentage}%
                                               </Card.Text>
                                           </Col>
                                       </Row>
                                   </Container>
                                   <Card.Text>
                                       {optionOneVotes} out of {totalVotes} votes
                                   </Card.Text>
                               </Card.Body>
                        </Card>
                    </Row>
                    
                    <Row className="mt-3 mb-3">
                        <Card.Text style={{color:'green', fontWeight:'bold', fontSize: 20}}>
                            --OR--
                        </Card.Text>     
                    </Row>

                    {/* Option 2 */}
                    <Row className="justify-content-md-center">
                        <Card
                            border={optionTwoBorder}
                            style={{ width: '35rem' }}
                            className="text-center mb-2"
                            bg="light"
                        >
                            <Card.Body>
                                <Card.Text style={{color:optionTwoTextColor, fontWeight:'bold', fontSize: 20}}>
                                    ...{optionTwoText}?
                                </Card.Text>
                                <Container>
                                    <Row sm={10}>
                                        <Col>
                                            <ProgressBar striped now={optionTwoPercentage} />
                                        </Col>
                                        <Col sm={2}>
                                            <Card.Text>
                                                {optionTwoPercentage}%
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </Container>
                                <Card.Text>
                                    {optionTwoVotes} out of {totalVotes} votes
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>

                </Card>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, users, questions }, props) {

    const id = props.id
    const question = questions[id]

    return {
        id,
        authedUser,
        users,
        question: question
            ? question
            : null
    }
}

export default connect(mapStateToProps)(QuestionAnswered)
