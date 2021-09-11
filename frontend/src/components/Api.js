import axios from 'axios';

// const addr = 'http://localhost:5000/api'

const addr = 'https://jojo-chatting.herokuapp.com/api'

const Api = axios.create({
    baseURL: addr,
})

export default Api