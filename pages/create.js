import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Container, Segment, Header, Form } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { initStore, createWallet } from '../store'
import withRedux from 'next-redux-wrapper'
import { walletToText } from '../utils/wallet'

class Create extends Component {
  constructor () {
    super()

    this.state = {
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.createWallet = this.createWallet.bind(this)
  }
  createWallet () {
    this.props.createWallet(this.state.password)
      .then(() => {
        this.setState({ password: '' })
      })
  }
  handleChange (name) {
    return (e, { value }) => {
      this.setState({ [name]: value })
    }
  }
  render () {
    const { wallet } = this.props
    return (
      <Layout>
        <div>
          <Container text>
            <Segment color='grey'>
              <Header as='h4'>Create a New Wallet</Header>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Input placeholder='Password' value={this.state.password} type='password' onChange={this.handleChange('password')} />
                  <Form.Button floated='left' onClick={this.createWallet}>Generate</Form.Button>
                </Form.Group>
                <Form.TextArea rows={7} value={walletToText((wallet && wallet.isNew) ? wallet : undefined)} readOnly />
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
    createWallet: bindActionCreators(createWallet, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Create)
