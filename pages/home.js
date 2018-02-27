import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Segment, Container, Header } from 'semantic-ui-react'

class Home extends Component {
  render () {
    return (
      <Layout>
        <div>
          <Container text>
            <Segment color='grey'>
              <Header as='h4'>Blockchain Wallet</Header>
            </Segment>
          </Container>
        </div>
      </Layout>
    )
  }
}

export default Home
