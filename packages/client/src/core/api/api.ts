import axios from 'axios'

const HOST = __API_URL__

const axiosDB = axios.create({
  baseURL: HOST,
  withCredentials: true,
  responseType: 'json',
})

export default axiosDB
