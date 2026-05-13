import React, { Component } from 'react'
import { Carousel, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Mousetrap from 'mousetrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompress } from '@fortawesome/free-solid-svg-icons'

export default class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      mystery: 0,
      controlsVisible: true
    }

    this.transitioningTo = 0
    this.exit = this.exit.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.prevSlide = this.prevSlide.bind(this)
    this.goToIndex = this.goToIndex.bind(this)
    this.nextMystery = this.nextMystery.bind(this)
    this.prevMystery = this.prevMystery.bind(this)
    this.activity = this.activity.bind(this)
    this.activityDone = this.activityDone.bind(this)
    this.preload = this.preload.bind(this)
  }

  nextMystery(e) {
    e && e.stopPropagation()
    this.transitioningTo = this.nextIndex(this.state.mystery)
    if (this.transitioningTo === 0) {
      this.transitioningTo = this.state.mystery
      return
    }

    this.setState({ mystery: this.transitioningTo, activeIndex: 0 })
    this.preload()
    this.activity()
    return false
  }

  prevMystery(e) {
    e && e.stopPropagation()
    this.transitioningTo = this.prevIndex(this.state.mystery)
    if (this.transitioningTo === this.props.items.length - 1) {
      this.transitioningTo = this.state.mystery
      return
    }

    this.transitioningTo = this.prevIndex(this.state.mystery)
    this.setState({ mystery: this.transitioningTo, activeIndex: 0 })
    this.preload()
    this.activity()
    return false
  }

  nextIndex(referencePoint) {
    return referencePoint === this.props.items.length - 1 ? 0 : referencePoint + 1
  }

  prevIndex(referencePoint) {
    return referencePoint === 0 ? this.props.items.length - 1 : referencePoint - 1
  }

  preload() {
    this.preloadImage(this.props.items[this.nextIndex(this.transitioningTo)][0].src)
    this.preloadImage(this.props.items[this.prevIndex(this.transitioningTo)][0].src)
  }

  preloadImage(url) {
    const img = document.createElement('img')
    img.src = url
  }

  nextSlide(e) {
    e && e.stopPropagation()
    const nextIndex =
      this.state.activeIndex === this.props.items[this.state.mystery].length - 1 ? 0 : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
    return false
  }

  prevSlide(e) {
    e && e.stopPropagation()
    const nextIndex =
      this.state.activeIndex === 0 ? this.props.items[this.state.mystery].length - 1 : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
    return false
  }

  goToIndex(newIndex) {
    this.setState({ activeIndex: newIndex })
  }

  activity() {
    this.setState({ controlsVisible: true })
    if (this.activityTimeout) {
      clearTimeout(this.activityTimeout)
    }

    this.activityTimeout = setTimeout(this.activityDone, 8000)
  }

  activityDone() {
    this.setState({ controlsVisible: false })
  }

  exit(e) {
    e.stopPropagation()
    this.props.onExit()
  }

  componentDidMount() {
    Mousetrap.bind(['left'], this.prevMystery)
    Mousetrap.bind(['right'], this.nextMystery)
    Mousetrap.bind(['shift+left'], this.prevSlide)
    Mousetrap.bind(['shift+right'], this.nextSlide)
    Mousetrap.bind(['up', 'down'], this.activity)
    Mousetrap.bind(['esc', 'backspace'], this.exit)
    this.preload()
  }

  componentWillUnmount() {
    Mousetrap.unbind(['left'], this.prevMystery)
    Mousetrap.unbind(['right'], this.nextMystery)
    Mousetrap.unbind(['shift+left'], this.prevSlide)
    Mousetrap.unbind(['shift+right'], this.nextSlide)
    Mousetrap.unbind(['up', 'down'], this.activity)
    Mousetrap.unbind(['esc', 'backspace'], this.exit)
  }

  render() {
    const slides = this.props.items[this.state.mystery].map((item) => {
      return (
        <Carousel.Item key={item.src}>
          <img src={item.src} alt={item.name} className="img-fluid" />
          <Carousel.Caption className="caption d-none">
            <h3>{item.name}</h3>
            <p>{item.meditation}</p>
          </Carousel.Caption>
        </Carousel.Item>
      )
    })

    return (
      <div
        className={
          'carousel-container ' +
          (this.props.visible ? ' fullscreen visible ' : '') +
          (this.state.controlsVisible ? ' active ' : '') +
          (this.props.indicators ? ' indicators ' : '') +
          (this.props.autohideCaptions ? ' autohideCaptions ' : '')
        }
        ref={this.props.sliderRef}
        onClick={this.activity}
        onKeyDown={this.activity}
        onMouseMove={this.activity}
        onMouseOver={this.activity}
        onMouseOut={this.activity}
        onTouchCancel={this.activity}
        onTouchMove={this.activity}
        onTouchStart={this.activity}
        onWheel={this.activity}>
        <Carousel
          key={this.props.interval}
          activeIndex={this.state.activeIndex}
          onSelect={this.goToIndex}
          keyboard={false}
          pause={false}
          interval={this.props.interval}
          slide={false}
          controls={false}
          indicators={this.props.indicators}>
          {slides}
        </Carousel>
        <button
          className={`carousel-control-prev${this.state.mystery === 0 ? ' disabled' : ''}`}
          onClick={this.prevMystery}
          type="button">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className={`carousel-control-next${this.state.mystery === this.props.items.length - 1 ? ' disabled' : ''}`}
          onClick={this.nextMystery}
          type="button">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
        <OverlayTrigger placement="left" overlay={<Tooltip>Exit Slideshow</Tooltip>}>
          <span className="exit-fullscreen" onClick={this.exit}>
            <FontAwesomeIcon icon={faCompress} />
          </span>
        </OverlayTrigger>
      </div>
    )
  }
}
