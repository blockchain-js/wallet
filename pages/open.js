import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Container, Segment, Header, Form } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { initStore, openWallet } from '../store'
import withRedux from 'next-redux-wrapper'
import { walletToText } from '../utils/wallet'

class Open extends Component {
  constructor () {
    super()

    this.state = {
      password: '',
      privateKey: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.openWallet = this.openWallet.bind(this)
  }
  openWallet () {
    this.props.openWallet(this.state.password, this.state.privateKey)
      .then(() => {
        this.setState({ password: '', privateKey: '' })
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
              <Header as='h4'>Open an Existing Wallet</Header>
              <Form>
                <Form.Input placeholder='Private Key' value={this.state.privateKey} type='text' onChange={this.handleChange('privateKey')} />
                <Form.Input placeholder='Password' value={this.state.password} type='password' onChange={this.handleChange('password')} />
                <Form.Button onClick={this.openWallet}>Open</Form.Button>
                <Form.TextArea rows={7} value={walletToText((wallet && !wallet.isNew) ? wallet : undefined)} readOnly />
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
    openWallet: bindActionCreators(openWallet, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Open)
