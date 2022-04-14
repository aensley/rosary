import React, { Component } from 'react'
import { Button } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faPlayCircle from '@fortawesome/fontawesome-free-solid/faPlayCircle'

export default class LaunchButton extends Component {
  constructor (props) {
    super(props)
    this.launch = this.launch.bind(this)
  }

  launch () {
    this.props.launchAction(this.props.category)
  }

  render () {
    const size = this.props.size || 'md'
    return (
      <Button outline={this.props.outline} color='primary' onClick={this.launch} size={size}>
        <FontAwesomeIcon icon={faPlayCircle} /> {this.props.text}
      </Button>
    )
  }
}
