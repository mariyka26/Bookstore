import axios from 'axios'
import { baseUrl } from './api'

// Создание экземпляра axios с базовым URL
const client = axios.create({
    baseURL: baseUrl
});

// Перехватчик запросов (можно оставить, если нужно выполнять дополнительные действия)
client.interceptors.request.use(function (config) {
    // Можно выполнять дополнительные действия с конфигурацией запроса, если необходимо
    return config;
});

// Экспорт методов axios для использования в других частях приложения
export const get = client.get;
export const post = client.post;
export const put = client.put;
export const del = client.delete;