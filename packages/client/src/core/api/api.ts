import axios from 'axios'

const HOST_PROXY = `${__SERVER_URL__}:${__SERVER_PORT__}`
console.log('host', HOST_PROXY)
const axiosDB = axios.create({
  baseURL: HOST_PROXY,
  withCredentials: true,
  responseType: 'json',
})

export { axiosDB }
