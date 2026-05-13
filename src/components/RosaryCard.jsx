import React, { Component } from 'react'
import { Card, Col } from 'react-bootstrap'

export default class RosaryCard extends Component {
  constructor(props) {
    super(props)
    this.launch = this.launch.bind(this)
  }

  launch(e) {
    this.props.launchAction(this.props.card.name)
  }

  render() {
    const card = this.props.card
    let summary = ''
    if (card.days.length > 2) {
      summary = card.days[0] + 's, ' + card.days[1] + 's, & ' + card.days[2] + 's'
    } else {
      summary = card.days.join('s & ') + 's'
    }
    return (
      <Col md="6">
        <Card className="mb-4 box-shadow" onClick={this.launch}>
          <Card.Img variant="top" alt={card.name} src={card.src} />
          <Card.Body>
            <Card.Title>{card.name} Mysteries</Card.Title>
            <Card.Text className="text-success">{summary}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}
