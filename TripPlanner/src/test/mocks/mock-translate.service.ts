import { Observable, of } from 'rxjs'

export class MockTranslateService {
  public get(key: string): Observable<string> {
    return of(key)
  }
}
