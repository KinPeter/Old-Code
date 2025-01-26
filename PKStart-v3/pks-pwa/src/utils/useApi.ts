import { StorageKey, useStorage } from './useStorage'
import { User } from '../types/User'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export const useApi = () => {
  const baseUrl = process.env.REACT_APP_PK_API_URL
  const { getStored } = useStorage()

  function getHeaders(isAuth: boolean): Headers {
    const { token } = getStored<User>(StorageKey.USER) ?? { token: null }
    if (isAuth && !token) {
      throw new Error('This is an authorized request but no token found!')
    }
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    if (isAuth) {
      headers.append('Authorization', `Bearer ${token}`)
    }
    return headers
  }

  async function request<R, T>(
    path: string,
    requestBody: R | null,
    method: Method,
    isAuth: boolean
  ): Promise<T> {
    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers: getHeaders(isAuth),
      body: method === 'GET' ? undefined : JSON.stringify(requestBody),
    })
    if (!res.ok) {
      const text = await res.text()
      const error = JSON.parse(text)
      throw new Error(error.message)
    }
    try {
      return (await res.json()) as T
    } catch (e) {
      return undefined as unknown as T
    }
  }

  async function get<T>(path: string, isAuth: boolean = true): Promise<T> {
    return request<null, T>(path, null, 'GET', isAuth)
  }

  async function post<R, T>(path: string, requestBody: R, isAuth: boolean = true): Promise<T> {
    return request<R, T>(path, requestBody, 'POST', isAuth)
  }

  async function put<R, T>(path: string, requestBody: R, isAuth: boolean = true): Promise<T> {
    return request<R, T>(path, requestBody, 'PUT', isAuth)
  }

  return {
    get,
    post,
    put,
  }
}
