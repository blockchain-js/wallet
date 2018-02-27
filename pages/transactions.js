import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Container, Segment, Header, Form } from 'semantic-ui-react'

class Transactions extends Component {
  render () {
    return (
      <Layout>
        <div>
          <Container text>
            <Segment color='grey'>
              <Header as='h4'>Send Transaction</Header>
              <Form>
                <Form.Input placeholder='Sender' />
                <Form.Input placeholder='Recipient' />
                <Form.Input placeholder='Value' />
                <Form.TextArea />
                <Form.Button>Sign Transaction</Form.Button>
                <Form.TextArea />
                <Form.Button>Send Transaction</Form.Button>
              </Form>
            </Segment>
          </Container>
        </div>
      </Layout>
    )
  }
}

export default Transactions
