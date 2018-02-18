import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Container, Segment, Header, Form } from 'semantic-ui-react'

class Open extends Component {
  render () {
    return (
      <Layout>
        <div>
          <Container text>
            <Segment color='grey'>
              <Header as='h4'>Open an Existing Wallet</Header>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Input placeholder='Private Key' />
                  <Form.Button floated='left'>Open</Form.Button>
                </Form.Group>
                <Form.TextArea />
              </Form>
            </Segment>
          </Container>
        </div>
      </Layout>
    )
  }
}

export default Open
