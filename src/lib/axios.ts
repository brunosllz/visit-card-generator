import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '',
})
