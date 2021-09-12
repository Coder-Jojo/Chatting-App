import React from 'react'
import {ChatArea, Auth} from './components'

import Cookies from 'universal-cookie'

const cookies = new Cookies()

const authToken = cookies?.get('token')

const App = () => {

  if(!authToken){
    return(
      <Auth />
    )
  }
  return (
    <ChatArea />
  )
}

export default App
