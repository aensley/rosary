import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

export default class LaunchButton extends Component {
  constructor(props) {
    super(props)
    this.launch = this.launch.bind(this)
  }

  launch() {
    this.props.launchAction(this.props.category)
  }

  render() {
    const size = this.props.size || 'md'
    return (
      <Button variant={this.props.outline ? 'outline-primary' : 'primary'} onClick={this.launch} size={size}>
        <FontAwesomeIcon icon={faPlayCircle} /> {this.props.text}
      </Button>
    )
  }
}
