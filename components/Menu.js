import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { Menu as SemanticMenu, Segment } from 'semantic-ui-react'

const { Router } = require('../routes')

class Menu extends Component {
  state = { activeItem: this.props.router.asPath.length > 1 ? this.props.router.asPath.slice(1) : 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    Router.pushRoute(`/${name}`)
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <SemanticMenu pointing secondary>
          <SemanticMenu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <SemanticMenu.Item name='create' active={activeItem === 'create'} onClick={this.handleItemClick} />
          <SemanticMenu.Item name='open' active={activeItem === 'open'} onClick={this.handleItemClick} />
          <SemanticMenu.Item name='account' active={activeItem === 'account'} onClick={this.handleItemClick} />
          <SemanticMenu.Item name='balance' active={activeItem === 'balance'} onClick={this.handleItemClick} />
          <SemanticMenu.Item name='send' active={activeItem === 'send'} onClick={this.handleItemClick} />
          <SemanticMenu.Menu position='right'>
            <SemanticMenu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
          </SemanticMenu.Menu>
        </SemanticMenu>
      </div>
    )
  }
}

export default withRouter(Menu)