import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Container, Segment, Header, Form } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { initStore, sendTransaction, signTransaction, signatureChange } from '../store'
import withRedux from 'next-redux-wrapper'

class Transactions extends Component {
  constructor() {
    super()

    this.state = {
      recipient: '',
      transactionValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.signTransaction = this.signTransaction.bind(this)
    this.sendTransaction = this.sendTransaction.bind(this)
    this.transactionHashToString = this.transactionHashToString.bind(this)
    this.handleChangeSignature = this.handleChangeSignature.bind(this)
  }
  handleChange(name) {
    return (e, { value }) => {
      this.setState({ [name]: value })
    }
  }
  handleChangeSignature(e, { value }) {
    try {
      const parsed = JSON.parse(value)
      this.props.signatureChange(parsed)
    } catch (e) {
      console.log('JSON parse: Wrong signature')
    }
  }
  signTransaction() {
    const { wallet } = this.props
    const { recipient, transactionValue, password } = this.state
    this.props.signTransaction(wallet.privateKey, password, recipient, transactionValue)
      .then(() => {
        this.setState({ password: '' })
      })
  }
  sendTransaction() {
    const { transaction, wallet } = this.props
    if (wallet.address !== transaction.signature.from) {
      return alert('Wrong password!')
    }
    this.props.sendTransaction(transaction.signature)
      .then(() => {
        this.setState({ recipient: '', transactionValue: '' })
      })
  }
  transactionHashToString(transaction) {
    return `Transaction successfully sent.
Transaction hash: ${transaction.hash}
    `
  }
  render() {
    const { transaction, wallet } = this.props
    return (
      <Layout>
        <div>
          <Container text>
            <Segment color='grey'>
              <Header as='h4'>Send Transaction</Header>
              <Form>
                <Form.Input value={wallet ? wallet.address : ''} placeholder='Sender' readOnly />
                <Form.Input placeholder='Recipient' value={this.state.recipient} type='text' onChange={this.handleChange('recipient')} />
                <Form.Input placeholder='Value' value={this.state.transactionValue} type='text' onChange={this.handleChange('transactionValue')} />
                <Form.Input placeholder='Password' value={this.state.password} type='password' onChange={this.handleChange('password')} />
                <Form.TextArea rows={12} onChange={this.handleChangeSignature} value={(transaction && transaction.signature) ? JSON.stringify(transaction.signature, null, 2) : undefined} />
                <Form.Button onClick={this.signTransaction}>Sign Transaction</Form.Button>
                <Form.TextArea rows={7} value={(transaction && transaction.hash) ? this.transactionHashToString(transaction) : undefined} readOnly />
                <Form.Button onClick={this.sendTransaction}>Send Transaction</Form.Button>
              </Form>
            </Segment>
          </Container>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = ({ wallet, transaction }) => ({ wallet, transaction })

const mapDispatchToProps = (dispatch) => {
  return {
    signatureChange: bindActionCreators(signatureChange, dispatch),
    sendTransaction: bindActionCreators(sendTransaction, dispatch),
    signTransaction: bindActionCreators(signTransaction, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Transactions)
