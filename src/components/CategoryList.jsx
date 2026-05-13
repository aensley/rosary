import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import RosaryCard from './RosaryCard'

export default class CategoryList extends Component {
  render() {
    const launchAction = this.props.launchAction
    return (
      <div className="py-5">
        <Container>
          <Row>
            {this.props.categoryThumbs.map(function (card) {
              return <RosaryCard card={card} key={card.name} launchAction={launchAction} />
            })}
          </Row>
        </Container>
      </div>
    )
  }
}
