import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Container, Segment, Header } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { initStore, noWallet } from '../store'
import withRedux from 'next-redux-wrapper'
import Router from 'next/router'

class Logout extends Component {
  constructor(props) {
    super()

    props.noWallet()
    Router.push('/')
  }
  render() {
    return (
      <Layout>
        <div>
          <Container text>
            <Segment color='grey'>
              <Header as='h4'>You will be redirected shortly...</Header>
            </Segment>
          </Container>
        </div>
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    noWallet: bindActionCreators(noWallet, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(Logout)
