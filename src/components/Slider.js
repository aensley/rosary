import React, { Component } from 'react'
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, Tooltip } from 'reactstrap'
import Mousetrap from 'mousetrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCompress from '@fortawesome/fontawesome-free-solid/faCompress'

export default class Slider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0,
      mystery: 0,
      controlsVisible: true,
      leftEnabled: false,
      rightEnabled: true,
      efsTooltipOpen: false,
      nextTooltipOpen: false,
      prevTooltipOpen: false
    }

    this.transitioningTo = 0
    this.exit = this.exit.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.prevSlide = this.prevSlide.bind(this)
    this.goToIndex = this.goToIndex.bind(this)
    this.onExiting = this.onExiting.bind(this)
    this.onExited = this.onExited.bind(this)
    this.nextMystery = this.nextMystery.bind(this)
    this.prevMystery = this.prevMystery.bind(this)
    this.toggleEfsTooltip = this.toggleEfsTooltip.bind(this)
    this.toggleNextTooltip = this.toggleNextTooltip.bind(this)
    this.togglePrevTooltip = this.togglePrevTooltip.bind(this)
    this.activity = this.activity.bind(this)
    this.activityDone = this.activityDone.bind(this)
    this.preload = this.preload.bind(this)
  }

  nextMystery (e) {
    e && e.stopPropagation()
    this.transitioningTo = this.nextIndex(this.state.mystery)
    if (this.transitioningTo === 0) {
      this.transitioningTo = this.state.mystery
      return
    }

    this.setState({ mystery: this.transitioningTo, activeIndex: 0 })
    this.preload()
    return false
  }

  prevMystery (e) {
    e && e.stopPropagation()
    this.transitioningTo = this.prevIndex(this.state.mystery)
    if (this.transitioningTo === this.props.items.length - 1) {
      this.transitioningTo = this.state.mystery
      return
    }

    this.transitioningTo = this.prevIndex(this.state.mystery)
    this.setState({ mystery: this.transitioningTo, activeIndex: 0 })
    this.preload()
    return false
  }

  nextIndex (referencePoint) {
    return referencePoint === this.props.items.length - 1 ? 0 : referencePoint + 1
  }

  prevIndex (referencePoint) {
    return referencePoint === 0 ? this.props.items.length - 1 : referencePoint - 1
  }

  preload () {
    this.preloadImage(this.props.items[this.nextIndex(this.transitioningTo)][0].src)
    this.preloadImage(this.props.items[this.prevIndex(this.transitioningTo)][0].src)
  }

  preloadImage (url) {
    const img = document.createElement('img')
    img.src = url
  }

  onExiting () {
    this.animating = true
  }

  onExited () {
    this.animating = false
  }

  nextSlide (e) {
    e && e.stopPropagation()
    if (this.animating) {
      return
    }

    const nextIndex =
      this.state.activeIndex === this.props.items[this.state.mystery].length - 1 ? 0 : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
    return false
  }

  prevSlide (e) {
    e && e.stopPropagation()
    if (this.animating) {
      return
    }

    const nextIndex =
      this.state.activeIndex === 0 ? this.props.items[this.state.mystery].length - 1 : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
    return false
  }

  goToIndex (newIndex) {
    if (this.animating) {
      return
    }

    this.setState({ activeIndex: newIndex })
  }

  toggleEfsTooltip () {
    this.setState({ efsTooltipOpen: !this.state.efsTooltipOpen })
  }

  toggleNextTooltip () {
    this.setState({ nextTooltipOpen: !this.state.nextTooltipOpen })
  }

  togglePrevTooltip () {
    this.setState({ prevTooltipOpen: !this.state.prevTooltipOpen })
  }

  activity () {
    // Show carousel controls
    this.setState({ controlsVisible: true })
    if (this.activityTimeout) {
      clearTimeout(this.activityTimeout)
    }

    // Auto-hide carousel controls after 5 seconds
    this.activityTimeout = setTimeout(this.activityDone, 5000)
  }

  activityDone () {
    this.setState({ controlsVisible: false })
  }

  exit (e) {
    e.stopPropagation()
    this.setState({ efsTooltipOpen: false, nextTooltipOpen: false, prevTooltipOpen: false })
    this.props.onExit()
  }

  componentWillMount () {
    Mousetrap.bind(['left'], this.prevMystery)
    Mousetrap.bind(['right'], this.nextMystery)
    Mousetrap.bind(['shift+left'], this.prevSlide)
    Mousetrap.bind(['shift+right'], this.nextSlide)
    Mousetrap.bind(['esc', 'backspace'], this.exit)
  }

  componentDidMount () {
    this.preload()
  }

  componentWillUnmount () {
    Mousetrap.unbind(['left'], this.prevMystery)
    Mousetrap.unbind(['right'], this.nextMystery)
    Mousetrap.unbind(['shift+left'], this.prevSlide)
    Mousetrap.unbind(['shift+right'], this.nextSlide)
    Mousetrap.unbind(['esc', 'backspace'], this.exit)
    this.setState({ efsTooltipOpen: false, nextTooltipOpen: false, prevTooltipOpen: false })
  }

  render () {
    const slides = this.props.items[this.state.mystery].map((item) => {
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
          <img src={item.src} alt={item.name} className='img-fluid' />
          <CarouselCaption className='caption' captionText={item.meditation} captionHeader={item.name} />
        </CarouselItem>
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
        onWheel={this.activity}

        // onBlur={this.activity}
        // onFocus={this.activity}
        // onInput={this.activity}
        // onKeyPress={this.activity}
        // onKeyUp={this.activity}
        // onMouseDown={this.activity}
        // onMouseUp={this.activity}
        // onPointerEnter={this.activity}
        // onPointerLeave={this.activity}
        // onPointerMove={this.activity}
        // onPointerOut={this.activity}
        // onPointerOver={this.activity}
        // onPointerUp={this.activity}
        // onResize={this.activity}
        // onScroll={this.activity}
      >
        <Carousel
          activeIndex={this.state.activeIndex}
          next={this.nextSlide}
          previous={this.prevSlide}
          keyboard={false}
          pause={false}
          ride='carousel'
          interval={this.props.interval}
          slide={false}
          className='carousel-fade'
        >
          <CarouselIndicators
            items={this.props.items[this.state.mystery]}
            activeIndex={this.state.activeIndex}
            onClickHandler={this.goToIndex}
          />
          {slides}
          <CarouselControl
            direction='prev'
            directionText='Previous'
            className={this.state.mystery === 0 ? 'disabled ' : ''}
            onClickHandler={this.prevMystery}
          />
          <CarouselControl
            direction='next'
            directionText='Next'
            className={this.state.mystery === this.props.items.length - 1 ? 'disabled ' : ''}
            onClickHandler={this.nextMystery}
          />
        </Carousel>
        <FontAwesomeIcon icon={faCompress} onClick={this.exit} className='exit-fullscreen' />
        <Tooltip
          placement='left'
          isOpen={this.state.efsTooltipOpen}
          target='.exit-fullscreen'
          toggle={this.toggleEfsTooltip}
        >
          Exit Slideshow
        </Tooltip>
        <Tooltip
          placement='left'
          isOpen={this.state.nextTooltipOpen}
          target='.carousel-control-next'
          toggle={this.toggleNextTooltip}
        >
          Next Mystery
        </Tooltip>
        <Tooltip
          placement='right'
          isOpen={this.state.prevTooltipOpen}
          target='.carousel-control-prev'
          toggle={this.togglePrevTooltip}
        >
          Previous Mystery
        </Tooltip>
      </div>
    )
  }
}
