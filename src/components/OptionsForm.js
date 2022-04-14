import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faImages from '@fortawesome/fontawesome-free-solid/faImages'
import faImage from '@fortawesome/fontawesome-free-solid/faImage'
import faHourglassHalf from '@fortawesome/fontawesome-free-solid/faHourglassHalf'

export default class OptionsForm extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.cycleChange = this.cycleChange.bind(this)
    this.delayChange = this.delayChange.bind(this)
    this.autohideChange = this.autohideChange.bind(this)
    this.meditationChange = this.meditationChange.bind(this)
    this.nameChange = this.nameChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
  }

  cycleChange (e) {
    const newOptions = this.props.options
    newOptions.cycle = e.target.value === '1'
    this.props.onOptionsChange(newOptions)
  }

  delayChange (e) {
    const newOptions = this.props.options
    newOptions.delay = parseInt(e.target.value)
    this.props.onOptionsChange(newOptions)
  }

  autohideChange () {
    const newOptions = this.props.options
    newOptions.autohideCaptions = !this.props.options.autohideCaptions
    this.props.onOptionsChange(newOptions)
  }

  meditationChange () {
    const newOptions = this.props.options
    newOptions.meditations = !this.props.options.meditations
    this.props.onOptionsChange(newOptions)
  }

  nameChange () {
    const newOptions = this.props.options
    newOptions.names = !this.props.options.names
    this.props.onOptionsChange(newOptions)
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup check>
          <Label check>
            <Input type='checkbox' name='showNames' onChange={this.nameChange} checked={this.props.options.names} />{' '}
            Show mystery <strong>names</strong>
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type='checkbox'
              name='showMeditations'
              onChange={this.meditationChange}
              checked={this.props.options.meditations}
            />{' '}
            Show mystery <strong>meditations</strong>
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type='checkbox'
              name='autohideCaptions'
              onChange={this.autohideChange}
              checked={this.props.options.autohideCaptions}
            />{' '}
            Autohide captions
          </Label>
        </FormGroup>
        <hr />
        <FormGroup tag='fieldset'>
          <FormGroup check>
            <Label check>
              <Input
                type='radio'
                name='cycle'
                value='0'
                onChange={this.cycleChange}
                checked={!this.props.options.cycle}
              />{' '}
              <FontAwesomeIcon icon={faImage} /> One image per mystery
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type='radio'
                name='cycle'
                value='1'
                onChange={this.cycleChange}
                checked={this.props.options.cycle}
              />{' '}
              <FontAwesomeIcon icon={faImages} /> Multiple images per mystery
            </Label>
          </FormGroup>
        </FormGroup>
        <div className={this.props.options.cycle ? '' : 'd-none'}>
          <hr />
          <FormGroup>
            <Label for='delay'>
              <FontAwesomeIcon icon={faHourglassHalf} /> Delay between images (seconds)
            </Label>
            <Input
              type='number'
              name='delay'
              id='delay'
              onChange={this.delayChange}
              value={this.props.options.delay}
              min='1'
            />
          </FormGroup>
        </div>
      </Form>
    )
  }
}
