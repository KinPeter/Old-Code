import { Injectable } from '@angular/core'
import { Store } from '~/app/services/core/store'
import { Observable } from 'rxjs'

interface LoadingState {
  progresses: boolean[]
  isLoading: boolean
}

const initialState: LoadingState = {
  progresses: [],
  isLoading: false
}

@Injectable({ providedIn: 'root' })
export class LoadingIndicatorService extends Store<LoadingState> {
  public isLoading: Observable<boolean> = this.select(state => state.isLoading)

  constructor() {
    super(initialState)
  }

  public start(): void {
    this.setState({
      progresses: [...this.state.progresses, true],
      isLoading: true
    })
  }

  public stop(): void {
    if (this.state.progresses.length === 0) {
      this.setState({
        isLoading: false
      })
    } else if (this.state.progresses.length === 1) {
      this.setState({
        progresses: [],
        isLoading: false
      })
    } else {
      const newProgresses = this.state.progresses
      newProgresses.pop()
      this.setState({
        progresses: newProgresses
      })
    }
  }
}
