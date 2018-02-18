import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Container, Segment, Header, Form } from 'semantic-ui-react'

class Create extends Component {
  render () {
    return (
      <Layout>
        <div>
          <Container text>
            <Segment color='grey'>
              <Header as='h4'>Create a New Wallet</Header>
              <Form>
                <Form.TextArea />
                <Form.Button>Generate</Form.Button>
              </Form>
            </Segment>
          </Container>
        </div>
      </Layout>
    )
  }
}

export default Create
