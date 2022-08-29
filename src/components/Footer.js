import React, { Component } from 'react'
import { Container, Button, Card, CardBody, Collapse } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faInfoCircle from '@fortawesome/fontawesome-free-solid/faInfoCircle'

export default class Footer extends Component {
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
      <footer className='text-muted'>
        <Container className='clearfix text-center'>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Button color='info' size='lg' onClick={this.toggle} style={{ width: '100%', margin: '0 auto', overflow: 'hidden' }}>
              <FontAwesomeIcon icon={faInfoCircle} /> <strong>More about the Rosary</strong>
            </Button>
            <Collapse isOpen={this.state.collapse}>
                <Card className='text-left' style={{ cursor: 'default' }}>
                  <CardBody>
                    <h3>More about the Rosary</h3>
                    <ul>
                      <li>
                        <a
                          href="https://www.usccb.org/how-to-pray-the-rosary"
                          rel='noopener'
                          target='_blank'
                        >
                          How to Pray the Rosary
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.catholic.com/tract/the-rosary"
                          rel='noopener'
                          target='_blank'
                        >
                          The History of the Rosary
                        </a>
                      </li>
                      <li>
                        <a
                          href='https://lifeteen.com/blog/why-do-catholics-pray-the-rosary/'
                          rel='noopener'
                          target='_blank'
                        >
                          Why we pray the rosary
                        </a>
                      </li>
                    </ul>
                    <h3>Catechism of the Catholic Church on the Rosary</h3>
                    <p>The Catechism of the Catholic Church (CCC) talks about the purpose of meditation, including the Rosary.</p>
                    <h4 style={{ marginLeft: 20 }}>Part Four: Christian Prayer</h4>
                    <h5 style={{ marginLeft: 40 }}>Section One: Prayer in the Christian Life</h5>
                    <h6 style={{ marginLeft: 60 }}>Chapter Three: The Life of Prayer</h6>
                    <h6 style={{ marginLeft: 80 }}>Article 1: Expressions of Prayer</h6>
                    <h6 style={{ marginLeft: 100 }}>II. Meditation</h6>
                    <p><strong>2707</strong> There are as many and varied methods of meditation as there are spiritual masters. Christians owe it to themselves to develop the desire to meditate regularly, lest they come to resemble the three first kinds of soil in the parable of the sower. But a method is only a guide; the important thing is to advance, with the Holy Spirit, along the one way of prayer: Christ Jesus.</p>
                    <p style={{ fontSize: 'larger' }}><strong>2708</strong> Meditation engages thought, imagination, emotion, and desire. This mobilization of faculties is necessary in order to deepen our convictions of faith, prompt the conversion of our heart, and strengthen our will to follow Christ. Christian prayer tries above all to meditate on the mysteries of Christ, as in lectio divina or the <u>rosary</u>. This form of prayerful reflection is of great value, but Christian prayer should go further: to the knowledge of the love of the Lord Jesus, to union with him.</p>
                  </CardBody>
                </Card>
            </Collapse>
          </div>
        </Container>
        <Container className='clearfix'>
          <p className='font-weight-light text-center mt-4'>
            <small>
              &copy;2022{' '}
              <a href='https://andrewensley.com' rel='author noopener' target='_blank'>
                Andrew Ensley
              </a>
            </small>
          </p>
        </Container>
      </footer>
    )
  }
}
