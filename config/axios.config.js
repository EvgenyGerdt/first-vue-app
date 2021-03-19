import axios from 'axios'

const instance = axios.create({
    timeout: 5000,
    headers: {'Access-Control-Allow-Origin': '*'}
})

export default instance

