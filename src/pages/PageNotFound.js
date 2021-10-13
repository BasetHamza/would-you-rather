import React, { Component } from 'react'

import {Row, Col, Image, Container, Button} from 'react-bootstrap'
import E404 from "../assets/images/404.png"

class PageNotFound extends Component {
  render() {

    const path = `${E404}`

    console.log(this.props);

    return (
      <Container align="center">
        <Col md='8'>
          <Row className="align-items-center">
              <Image src ={path}/>
          </Row>
          <Row>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={() => {
                this.props.history.push('/')
              }}
            >
              🏠 Back Home 🏠
            </Button>
          </Row>
        </Col>
      </Container>
    )
  }
}

export default PageNotFound
