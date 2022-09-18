import React, { Component } from 'react'
import { Container, Row } from 'reactstrap'
import RosaryCard from './RosaryCard'
import Rosary from './Rosary'

export default class CategoryList extends Component {
  render () {
    const rosary = new Rosary()
    const launchAction = this.props.launchAction
    return (
      <div className='py-5 bg-light'>
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
