import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import ChatArea from './components/ChatArea'
import Join from './components/Join'


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
