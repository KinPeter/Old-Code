import { gifImageBase64, jpgImageBase64 } from '~/test/mocks/data/mock-files-base64'

export function dataUrlToFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const base64 = atob(arr[1])
  let n = base64.length
  const uint8Array = new Uint8Array(n)

  while (n--) {
    uint8Array[n] = base64.charCodeAt(n)
  }

  return new File([uint8Array], filename, { type: mime })
}

export const jpegFile: File = dataUrlToFile(jpgImageBase64, 'test.jpg')

export const gifFile: File = dataUrlToFile(gifImageBase64, 'test.gif')

export const firebaseFilename = '1606141144880.jpg'
export const firebaseStorageUrl1 =
  'https://firebasestorage.googleapis.com/v0/b/pk-tripplanner.appspot.com/o/trips%2F1606141144880.jpg?alt=media&token=77206957-79f7-419c-8f3a-90e458f133d1'
export const firebaseStorageUrl2 =
  'https://firebasestorage.googleapis.com/v0/b/pk-tripplanner.appspot.com/o/profiles%2F1606141144880.jpg?alt=media&token=77206957-79f7-419c-8f3a-90e458f133d1'
export const invalidStorageUrl =
  'https://steamuserimages-a.akamaihd.net/ugc/255965188116948531/1055F0B8522D9DDEDC67058CDA090B109D4C4137/'
