import React from 'react'
import { Container } from 'semantic-ui-react'
import Head from 'next/head'
import Menu from './Menu.js'

export default props => {
  return (
    <Container style={{ textAlign: 'center', 'lineHeight': 0 }}>
      <Head>
        <link
          rel='stylesheet'
          href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.13/semantic.min.css'
        />
      </Head>

      <Menu />
      {props.children}
    </Container>
  )
}
