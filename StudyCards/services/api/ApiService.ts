import { AxiosRequestConfig } from 'axios'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default class ApiService {
  constructor(private $axios: NuxtAxiosInstance) {}

  /**
   * Issues a simple GET request to the API with the specified params
   */
  get<R>(
    url: string,
    params: Record<string, string> = {},
    config: AxiosRequestConfig = {}
  ): Promise<R> {
    return this.$axios.get(url, { ...config, params }).then(r => r.data)
    // .catch(e => {
    //   throw ApiError.create(e)
    // })
  }

  /**
   * Issues a POST request to the specified URL, sending the data as JSON body by default
   */
  post<D, R>(
    url: string,
    data: D,
    config: AxiosRequestConfig = {}
  ): Promise<R> {
    const configWithContentType: AxiosRequestConfig = {
      responseType: 'json',
      ...config,
    }
    return this.$axios.post(url, data, configWithContentType).then(r => r.data)
    // .catch(e => {
    //   throw ApiError.create(e)
    // })
  }

  /**
   * Issues a POST request to the specified URL, sending the data as JSON body by default
   */
  put<D, R>(url: string, data: D, config: AxiosRequestConfig = {}): Promise<R> {
    const configWithContentType: AxiosRequestConfig = {
      responseType: 'json',
      ...config,
    }
    return this.$axios.put(url, data, configWithContentType).then(r => r.data)
    // .catch(e => {
    //   throw ApiError.create(e)
    // })
  }

  /**
   * Deletes a resource. No output on success, throws error on failure
   */
  delete(url: string, config: AxiosRequestConfig = {}): Promise<void> {
    return this.$axios.delete(url, config).then(_ => undefined)
    // .catch(e => {
    //   throw ApiError.create(e)
    // })
  }
}
