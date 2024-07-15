import axios from 'axios'

const HOST = import.meta.env.VITE_API_URL

const axiosDB = axios.create({
  baseURL: HOST,
  withCredentials: true,
  responseType: 'json',
})

export default axiosDB
