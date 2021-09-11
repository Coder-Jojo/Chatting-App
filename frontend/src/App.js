import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import {Navbar, ChatArea, Join} from './components'

const App = () => {
  
  return (
    <Router>
      <Navbar/>
      <Route path="/" exact>
        <Join />
      </Route>
      <Route path="/chat" component={ChatArea} />
    </Router>
  )
}

export default App
