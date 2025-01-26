import { ApiUrl, firebaseConfig } from 'keys'
import { Environment } from '~/environments/environment'

export const environment: Environment = {
  production: true,
  apiUrl: ApiUrl.PROD,
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
