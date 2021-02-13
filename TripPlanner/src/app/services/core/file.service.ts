import { Injectable } from '@angular/core'
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs'
import { debounceTime, filter, switchMap } from 'rxjs/operators'

import { LoadingIndicatorService } from '~/app/services/core/loading-indicator.service'
import { SnackbarService } from '~/app/services/core/snackbar.service'
import { getExtension, getFilePathFromUrl } from '~/app/utils/file.utils'

export type ImagePath = 'trips' | 'profiles'

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(
    private storage: AngularFireStorage,
    private loading: LoadingIndicatorService,
    private snackbar: SnackbarService
  ) {}

  public async uploadTripCoverImage(file: File): Promise<string> {
    return await this.uploadFile(file, 'trips')
  }

  public async uploadProfilePicture(file: File): Promise<string> {
    return await this.uploadFile(file, 'profiles')
  }

  private async uploadFile(file: File, imagePath: ImagePath): Promise<string> {
    this.loading.start()
    const filename = new Date().getTime() + '.' + getExtension(file.name)
    const filePath = imagePath + '/' + filename.toLowerCase()
    const fileRef = this.storage.ref(filePath)
    try {
      return await this.storage
        .upload(filePath, file)
        .percentageChanges()
        .pipe(
          filter(value => value === 100),
          debounceTime(500),
          switchMap(() => fileRef.getDownloadURL() as Observable<string>)
        )
        .toPromise()
    } catch (e) {
      console.error(`[ERROR: FileService UPLOAD]`, e)
      this.snackbar.error()
    } finally {
      this.loading.stop()
    }
    return null
  }

  public async deleteFile(url: string): Promise<boolean> {
    this.loading.start()
    const filePath = getFilePathFromUrl(url)
    const fileRef = this.storage.ref(filePath)
    try {
      await fileRef.delete().toPromise()
      return true
    } catch (e) {
      console.error(`[ERROR: FileService DELETE]`, e)
      this.snackbar.error()
      return false
    } finally {
      this.loading.stop()
    }
  }
}
