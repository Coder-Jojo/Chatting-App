import axios from 'axios';
import Cookies from 'universal-cookie'

const addr = 'http://localhost:5000/api'

// const addr = 'https://jojo-chatting.herokuapp.com/api'

const cookies = new Cookies()

const Api = axios.create({
    baseURL: addr,
    headers: {
        authorization: cookies?.get('token')
      }
})

export default Api