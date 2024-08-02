import axios from 'axios'

const HOST = 'https://ya-praktikum.tech/api/v2'

const axiosDB = axios.create({
  baseURL: HOST,
  withCredentials: true,
  responseType: 'json',
})

export default axiosDB
