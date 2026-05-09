import React, { Component } from 'react'
import { Card, CardImg, CardBody, CardTitle, CardText, Col } from 'reactstrap'

export default class RosaryCard extends Component {
  constructor (props) {
    super(props)
    this.launch = this.launch.bind(this)
  }

  launch (e) {
    this.props.launchAction(this.props.card.name)
  }

  render () {
    const card = this.props.card
    let summary = ''
    if (card.days.length > 2) {
      summary = card.days[0] + 's, ' + card.days[1] + 's, & ' + card.days[2] + 's'
     } else {
      summary = card.days.join('s & ') + 's'
     }
    return (
      <Col md='6'>
        <Card className='mb-4 box-shadow' onClick={this.launch}>
          <CardImg top width='100%' alt={card.name} src={card.src} />
          <CardBody>
            <CardTitle>{card.name} Mysteries</CardTitle>
            <CardText className='text-success'>{summary}</CardText>
          </CardBody>
        </Card>
      </Col>
    )
  }
}
