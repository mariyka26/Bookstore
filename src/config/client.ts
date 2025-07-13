import axios from 'axios'
import { baseUrl } from './api'

const client = axios.create({
    baseURL: baseUrl
})

// Перехватчик запросов
client.interceptors.request.use(function (config) {
    return config
})

export const get = client.get
export const post = client.post
export const put = client.put
export const del = client.delete