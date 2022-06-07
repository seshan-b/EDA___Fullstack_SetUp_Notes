import React from 'react'
import { Route } from 'react-router'

import Home from './Home'
import Page from './Page'

function App () {
  return (
    <>
      <h1>The future home your web</h1>
      <h2>A Fullstack App</h2>

      <Route path="/" exact component={Home} />
      <Route path="/page" component={Page} />
    </>
  )
}

export default App
