import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Container, Segment, Header, Form } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { initStore, getBalance } from '../store'
import withRedux from 'next-redux-wrapper'

class Account extends Component {
  render () {
    const { wallet } = this.props
    return (
      <Layout>
        <div>
          <Container text>
            <Segment color='grey'>
              <Header as='h4'>View Account Balance</Header>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Input value={wallet ? wallet.address : ''} placeholder='Address' readOnly />
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

const mapStateToProps = ({ wallet }) => ({ wallet })

const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: bindActionCreators(getBalance, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Account)
