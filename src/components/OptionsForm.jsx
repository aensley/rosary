import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faImage, faHourglassHalf, faPhotoFilm } from '@fortawesome/free-solid-svg-icons'

export default class OptionsForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.cycleChange = this.cycleChange.bind(this)
    this.delayChange = this.delayChange.bind(this)
    this.autohideChange = this.autohideChange.bind(this)
    this.meditationChange = this.meditationChange.bind(this)
    this.nameChange = this.nameChange.bind(this)
    this.qualityChange = this.qualityChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  cycleChange(e) {
    const newOptions = this.props.options
    newOptions.cycle = e.target.value === '1'
    this.props.onOptionsChange(newOptions)
  }

  delayChange(e) {
    const newOptions = this.props.options
    newOptions.delay = parseInt(e.target.value)
    this.props.onOptionsChange(newOptions)
  }

  autohideChange() {
    const newOptions = this.props.options
    newOptions.autohideCaptions = !this.props.options.autohideCaptions
    this.props.onOptionsChange(newOptions)
  }

  meditationChange() {
    const newOptions = this.props.options
    newOptions.meditations = !this.props.options.meditations
    this.props.onOptionsChange(newOptions)
  }

  nameChange() {
    const newOptions = this.props.options
    newOptions.names = !this.props.options.names
    this.props.onOptionsChange(newOptions)
  }

  qualityChange(e) {
    const newOptions = this.props.options
    newOptions.quality = e.target.value
    this.props.onOptionsChange(newOptions)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Check
          type="checkbox"
          id="showNames"
          name="showNames"
          onChange={this.nameChange}
          checked={this.props.options.names}
          label={
            <span>
              Show mystery <strong>names</strong>
            </span>
          }
        />
        <Form.Check
          type="checkbox"
          id="showMeditations"
          name="showMeditations"
          onChange={this.meditationChange}
          checked={this.props.options.meditations}
          label={
            <span>
              Show mystery <strong>meditations</strong>
            </span>
          }
        />
        <Form.Check
          type="checkbox"
          id="autohideCaptions"
          name="autohideCaptions"
          onChange={this.autohideChange}
          checked={this.props.options.autohideCaptions}
          label="Autohide captions"
        />
        <hr />
        <fieldset>
          <Form.Check
            type="radio"
            id="cycleOff"
            name="cycle"
            value="0"
            onChange={this.cycleChange}
            checked={!this.props.options.cycle}
            label={
              <>
                <FontAwesomeIcon icon={faImage} /> One image per mystery
              </>
            }
          />
          <Form.Check
            type="radio"
            id="cycleOn"
            name="cycle"
            value="1"
            onChange={this.cycleChange}
            checked={this.props.options.cycle}
            label={
              <>
                <FontAwesomeIcon icon={faImages} /> Multiple images per mystery
              </>
            }
          />
        </fieldset>
        <hr />
        <fieldset>
          <Form.Label>
            <FontAwesomeIcon icon={faPhotoFilm} /> Image quality
          </Form.Label>
          {[
            { label: '4K', value: 'q' },
            { label: 'Full HD', value: 'h' },
            { label: 'HD', value: 'i' },
            { label: 'SD', value: 'd' }
          ].map(({ label, value }) => (
            <Form.Check
              type="radio"
              key={value}
              id={`quality-${value}`}
              name="quality"
              value={value}
              onChange={this.qualityChange}
              checked={this.props.options.quality === value}
              label={label}
            />
          ))}
        </fieldset>
        <div className={this.props.options.cycle ? '' : 'd-none'}>
          <hr />
          <Form.Group>
            <Form.Label htmlFor="delay">
              <FontAwesomeIcon icon={faHourglassHalf} /> Delay between images (seconds)
            </Form.Label>
            <Form.Control
              type="number"
              name="delay"
              id="delay"
              onChange={this.delayChange}
              value={this.props.options.delay}
              min="1"
            />
          </Form.Group>
        </div>
      </Form>
    )
  }
}
