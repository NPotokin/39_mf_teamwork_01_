import axios from 'axios'

const HOST_PROXY = `${__SERVER_URL__}`

const axiosDB = axios.create({
  baseURL: HOST_PROXY,
  withCredentials: true,
  responseType: 'json',
})

export { axiosDB }
