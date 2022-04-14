import React, { Component } from 'react'
import { Container } from 'reactstrap'

export default class Footer extends Component {
  render () {
    return (
      <footer className='text-muted'>
        <Container className='clearfix'>
          <p className='float-left'>
            <a
              href='https://lifeteen.com/blog/why-do-catholics-pray-the-rosary/'
              rel='noopener noreferrer'
              target='_blank'
            >
              Why we pray the rosary
            </a>
          </p>
          <p className='float-right font-weight-light'>
            <small>
              &copy;2018{' '}
              <a href='https://andrewensley.com' rel='author noopener noreferrer' target='_blank'>
                Andrew Ensley
              </a>
            </small>
          </p>
        </Container>
      </footer>
    )
  }
}
