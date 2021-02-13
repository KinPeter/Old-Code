// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { ApiUrl, firebaseConfig } from 'keys'
import { FileRules } from '~/app/utils/file.utils'

export interface Environment {
  production: boolean
  apiUrl: string
  languages: string[]
  firebase: Record<string, unknown>
  coverImageRules: FileRules
  profilePictureRules: FileRules
}

export const environment: Environment = {
  production: false,
  apiUrl: ApiUrl.LOCAL,
  languages: ['en', 'hu'],
  firebase: firebaseConfig,
  coverImageRules: {
    allowedTypes: ['image/jpeg', 'image/png'],
    maxFileSize: 5,
    minImageWidth: 340,
    minImageHeight: 200
  },
  profilePictureRules: {
    allowedTypes: ['image/jpeg', 'image/png'],
    maxFileSize: 5,
    minImageWidth: 200,
    minImageHeight: 200
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
