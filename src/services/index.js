import axios from 'axios'
import authService from './auth'
import userService from './user'
import feedbackService from './feedback'
import { setGlobalLoading, setGlobalError } from '../store/global'
import router from '../router'

const API_ENVS = {
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
})

httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)

  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
}, (error) => {
  const canThrowAnError = error.request.status === 0 ||
    error.request.status === 500

  if (canThrowAnError) {
    setGlobalLoading(false)
    setGlobalError(true)
    throw new Error(error.message)
  }

  if (error.response.status === 401) {
    router.push({ name: 'Home' })
  }

  setGlobalLoading(false)
  setGlobalError(true)
  return error
})

export default {
  auth: authService(httpClient),
  user: userService(httpClient),
  feedback: feedbackService(httpClient)
}
