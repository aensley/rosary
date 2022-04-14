import React, { Component } from 'react'
import { Button, Card, CardBody, Collapse, Jumbotron } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSlidersH from '@fortawesome/fontawesome-free-solid/faSlidersH'
import LaunchButton from './LaunchButton'
import OptionsForm from './OptionsForm'

export default class RosaryJumbotron extends Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = { collapse: false }
  }

  toggle () {
    this.setState({ collapse: !this.state.collapse })
  }

  render () {
    return (
      <Jumbotron className='text-center'>
        <h1 className='jumbotron-heading'>Pray the Rosary</h1>
        <p className='lead text-success'>{this.props.day}</p>
        <p>
          <LaunchButton
            size='lg'
            text={this.props.category + ' Mysteries'}
            category={this.props.category}
            launchAction={this.props.launchAction}
          />{' '}
          <Button color='secondary' size='lg' onClick={this.toggle}>
            <FontAwesomeIcon icon={faSlidersH} /> Options
          </Button>
        </p>
        <Collapse isOpen={this.state.collapse}>
          <div style={{ maxWidth: 326, margin: '0 auto' }}>
            <Card className='text-left'>
              <CardBody>
                <OptionsForm options={this.props.options} onOptionsChange={this.props.onOptionsChange} />
              </CardBody>
            </Card>
          </div>
        </Collapse>
      </Jumbotron>
    )
  }
}
