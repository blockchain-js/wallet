import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Container, Segment, Header, Form } from 'semantic-ui-react'

class Account extends Component {
  render () {
    return (
      <Layout>
        <div>
          <Container text>
            <Segment color='grey'>
              <Header as='h4'>View Account Balance</Header>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Input placeholder='Address' />
                  <Form.Button floated='left'>Balance</Form.Button>
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

export default Account
