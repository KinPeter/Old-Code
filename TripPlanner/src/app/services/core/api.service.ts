import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '~/environments/environment'
import { ApiRequestOptions } from '~/app/types/api.types'
import { SnackbarService } from '~/app/services/core/snackbar.service'
import { LoadingIndicatorService } from '~/app/services/core/loading-indicator.service'
import { AuthStore } from '~/app/services/auth/auth.store'

const defaultOptions: ApiRequestOptions = { handleError: true }

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private auth: AuthStore,
    private http: HttpClient,
    private snackbar: SnackbarService,
    private loadingIndicator: LoadingIndicatorService
  ) {}

  public async get<T>(path: string, options: ApiRequestOptions = defaultOptions): Promise<T> {
    this.setAuthorization(options)
    this.loadingIndicator.start()
    try {
      return await this.http.get<T>(`${environment.apiUrl}${path}`, options.postOptions).toPromise()
    } catch (error) {
      if (options.handleError) this.snackbar.error(options.errorMessage)
      console.error(`[ERROR: ApiService GET] from ${path}`, error)
      return error
    } finally {
      this.loadingIndicator.stop()
    }
  }

  public async post<Q, T>(
    path: string,
    data: Q,
    options: ApiRequestOptions = defaultOptions
  ): Promise<T> {
    this.setAuthorization(options)
    this.loadingIndicator.start()
    try {
      return await this.http
        .post<T>(`${environment.apiUrl}${path}`, data, options.postOptions)
        .toPromise()
    } catch (error) {
      if (options.handleError) this.snackbar.error(options.errorMessage)
      console.error(`[ERROR: ApiService POST] to ${path}`, error)
      return error
    } finally {
      this.loadingIndicator.stop()
    }
  }

  public async put<Q, T>(
    path: string,
    data: Q,
    options: ApiRequestOptions = defaultOptions
  ): Promise<T> {
    this.setAuthorization(options)
    this.loadingIndicator.start()
    try {
      return await this.http
        .put<T>(`${environment.apiUrl}${path}`, data, options.postOptions)
        .toPromise()
    } catch (error) {
      if (options.handleError) this.snackbar.error(options.errorMessage)
      console.error(`[ERROR: ApiService PATCH] to ${path}`, error)
      return error
    } finally {
      this.loadingIndicator.stop()
    }
  }

  public async delete<T>(path: string, options: ApiRequestOptions = defaultOptions): Promise<T> {
    this.setAuthorization(options)
    this.loadingIndicator.start()
    try {
      return await this.http
        .delete<T>(`${environment.apiUrl}${path}`, options.postOptions)
        .toPromise()
    } catch (error) {
      if (options.handleError) this.snackbar.error(options.errorMessage)
      console.error(`[ERROR: ApiService DELETE] on ${path}`, error)
      return error
    } finally {
      this.loadingIndicator.stop()
    }
  }

  private setAuthorization(options: ApiRequestOptions): void {
    if (!this.auth.isAuth) return
    if (!options.postOptions) {
      options.postOptions = {}
    }
    if (!options.postOptions.headers) {
      options.postOptions.headers = { Authorization: `Bearer ${this.auth.token}` }
    } else if (options.postOptions.headers instanceof HttpHeaders) {
      options.postOptions.headers.set('Authorization', `Bearer ${this.auth.token}`)
    } else {
      options.postOptions.headers['Authorization'] = `Bearer ${this.auth.token}`
    }
  }
}
