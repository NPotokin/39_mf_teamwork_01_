import axios from 'axios'

const HOST = 'https://ya-praktikum.tech/api/v2'
const HOST_PROXY = `${__SERVER_URL__}:${__SERVER_PORT__}`

const axiosDB = axios.create({
  baseURL: HOST,
  withCredentials: true,
  responseType: 'json',
})

const axiosProxy = axios.create({
  baseURL: HOST_PROXY,
  withCredentials: true,
  responseType: 'json',
})

export { axiosDB, axiosProxy }
