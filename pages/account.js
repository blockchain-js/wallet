import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Container, Segment, Header, Form } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { initStore, getBalance } from '../store'
import withRedux from 'next-redux-wrapper'

class Account extends Component {
  constructor () {
    super()

    this.getBalance = this.getBalance.bind(this)
    this.balanceToString = this.balanceToString.bind(this)
  }
  getBalance () {
    const { wallet } = this.props
    this.props.getBalance(wallet.address)
  }
  balanceToString (balance) {
    return `Balance (confirmed): ${balance.confirmedBalance.balance}
Balance (${balance.lastMinedBalance.confirmations} confirmation${balance.lastMinedBalance.confirmations > 1 ? 's' : ''}): ${balance.lastMinedBalance.balance}
Balance (pending): ${balance.pendingBalance.balance}
    `
  }
  render () {
    const { wallet, balance } = this.props
    return (
      <Layout>
        <div>
          <Container text>
            <Segment color='grey'>
              <Header as='h4'>View Account Balance</Header>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Input value={wallet ? wallet.address : ''} placeholder='Address' readOnly />
                  <Form.Button floated='left' onClick={this.getBalance}>Balance</Form.Button>
                </Form.Group>
                <Form.TextArea value={balance ? this.balanceToString(balance) : undefined} readOnly />
              </Form>
            </Segment>
          </Container>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = ({ wallet, balance }) => ({ wallet, balance })

const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: bindActionCreators(getBalance, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Account)
