import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface ApiRequestOptions {
  postOptions?: {
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        };
    observe?: 'body';
    params?:
      | HttpParams
      | {
          [param: string]: string | string[];
        };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  };
  handleError?: boolean;
  errorMessage?: string;
}
