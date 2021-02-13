import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UiService } from '~/app/services/ui.service';
import { environment } from '~/environments/environment';
import { ApiRequestOptions } from '~/app/types/api.types';

const defaultOptions: ApiRequestOptions = { handleError: true };

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, private ui: UiService) {}

  public async get<T>(path: string, options: ApiRequestOptions = defaultOptions): Promise<T> {
    this.ui.startLoading();
    try {
      return await this.http
        .get<T>(`${environment.API_URL}${path}`, options.postOptions)
        .toPromise();
    } catch (error) {
      if (options.handleError) this.ui.error(options.errorMessage);
      console.error(`[ERROR: ApiService GET] from ${path}`, error);
      return error;
    } finally {
      this.ui.stopLoading();
    }
  }

  public async post<Q, T>(
    path: string,
    data: Q,
    options: ApiRequestOptions = defaultOptions,
  ): Promise<T> {
    this.ui.startLoading();
    try {
      return await this.http
        .post<T>(`${environment.API_URL}${path}`, data, options.postOptions)
        .toPromise();
    } catch (error) {
      if (options.handleError) this.ui.error(options.errorMessage);
      console.error(`[ERROR: ApiService POST] to ${path}`, error);
      return error;
    } finally {
      this.ui.stopLoading();
    }
  }

  public async patch<Q, T>(
    path: string,
    data: Q,
    options: ApiRequestOptions = defaultOptions,
  ): Promise<T> {
    this.ui.startLoading();
    try {
      return await this.http
        .patch<T>(`${environment.API_URL}${path}`, data, options.postOptions)
        .toPromise();
    } catch (error) {
      if (options.handleError) this.ui.error(options.errorMessage);
      console.error(`[ERROR: ApiService PATCH] to ${path}`, error);
      return error;
    } finally {
      this.ui.stopLoading();
    }
  }

  public async delete<T>(path: string, options: ApiRequestOptions = defaultOptions): Promise<T> {
    this.ui.startLoading();
    try {
      return await this.http
        .delete<T>(`${environment.API_URL}${path}`, options.postOptions)
        .toPromise();
    } catch (error) {
      if (options.handleError) this.ui.error(options.errorMessage);
      console.error(`[ERROR: ApiService DELETE] on ${path}`, error);
      return error;
    } finally {
      this.ui.stopLoading();
    }
  }
}
