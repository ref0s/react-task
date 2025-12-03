import axios from 'axios'

export type LoginCredentials = {
  username: string
  password: string
}

export type User = {
  id: number
  username: string
  firstName: string
  lastName: string
  image?: string
}

export type Product = {
  id?: number
  title: string
  description: string
  price: number
  category: string
  stock: number
  thumbnail?: string
  images?: string[]
}

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  const isAuthRequest = config.url?.includes('/auth/login')

  if (token && !isAuthRequest) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const login = async (
  credentials: LoginCredentials,
): Promise<{ token: string; user: User }> => {
  const { data } = await api.post('/auth/login', {
    username: credentials.username.trim(),
    password: credentials.password.trim(),
  })
  const { accessToken, refreshToken, ...rest } = data

  return {
    token: accessToken,
    user: rest as User,
  }
}

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/products')
  return data.products as Product[]
}

export const getProduct = async (id: string | number): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`)
  return data as Product
}

export const createProduct = async (payload: Product): Promise<Product> => {
  const { data } = await api.post('/products/add', payload)
  return data as Product
}

export const updateProduct = async (
  id: string | number,
  payload: Partial<Product>,
): Promise<Product> => {
  const { data } = await api.put(`/products/${id}`, payload)
  return data as Product
}

export const deleteProduct = async (id: string | number): Promise<void> => {
  await api.delete(`/products/${id}`)
}

export default api
