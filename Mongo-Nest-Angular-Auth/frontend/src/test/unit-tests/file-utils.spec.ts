import { FileRules, getExtension, getFilePathFromUrl, validateFile } from '~/app/utils/file.utils'
import {
  firebaseStorageUrl1,
  firebaseStorageUrl2,
  gifFile,
  invalidStorageUrl,
  jpegFile
} from '~/test/mocks/data/mock-files'

const defaultFileRules: FileRules = {
  allowedTypes: ['image/jpeg', 'image/png'],
  maxFileSize: 5,
  minImageWidth: 340,
  minImageHeight: 200
}

describe('FileUtils validateFile', () => {
  it('should validate file type', async () => {
    const validation1 = await validateFile(jpegFile, defaultFileRules)
    expect(validation1.valid).toBeTrue()
    expect(validation1.errors.fileType).toBeFalse()
    expect(validation1.errors.imageSize).toBeFalse()
    expect(validation1.errors.fileSize).toBeFalse()

    const validation2 = await validateFile(gifFile, defaultFileRules)
    expect(validation2.valid).toBeFalse()
    expect(validation2.errors.fileType).toBeTrue()
    expect(validation2.errors.imageSize).toBeFalse()
    expect(validation2.errors.fileSize).toBeFalse()
  })

  it('should validate file size', async () => {
    const validation1 = await validateFile(jpegFile, defaultFileRules)
    expect(validation1.valid).toBeTrue()
    expect(validation1.errors.fileType).toBeFalse()
    expect(validation1.errors.imageSize).toBeFalse()
    expect(validation1.errors.fileSize).toBeFalse()

    const rules2: FileRules = {
      ...defaultFileRules,
      maxFileSize: 0.001
    }

    const validation2 = await validateFile(jpegFile, rules2)
    expect(validation2.valid).toBeFalse()
    expect(validation2.errors.fileType).toBeFalse()
    expect(validation2.errors.imageSize).toBeFalse()
    expect(validation2.errors.fileSize).toBeTrue()
  })

  it('should validate image size', async () => {
    const validation1 = await validateFile(jpegFile, defaultFileRules)
    expect(validation1.valid).toBeTrue()
    expect(validation1.errors.fileType).toBeFalse()
    expect(validation1.errors.imageSize).toBeFalse()
    expect(validation1.errors.fileSize).toBeFalse()

    const rules2: FileRules = {
      ...defaultFileRules,
      minImageWidth: 1920,
      minImageHeight: 1080
    }

    const validation2 = await validateFile(jpegFile, rules2)
    expect(validation2.valid).toBeFalse()
    expect(validation2.errors.fileType).toBeFalse()
    expect(validation2.errors.imageSize).toBeTrue()
    expect(validation2.errors.fileSize).toBeFalse()
  })
})

describe('FileUtils getExtension', () => {
  it('should parse the extension from file name properly', () => {
    expect(getExtension('simple.jpg')).toBe('jpg')
    expect(getExtension('a.bitMore.tricky.jpg')).toBe('jpg')
    expect(getExtension('some.long-name with spaces.jpg')).toBe('jpg')
    expect(getExtension('  simple-untrimmed.jpg   ')).toBe('jpg')
    expect(getExtension('noExtension')).toBe('noExtension')
  })
})

describe('FileUtils getFilePathFromUrl', () => {
  it('should parse the file path from the firebase url', () => {
    expect(getFilePathFromUrl(firebaseStorageUrl1)).toBe('trips/1606141144880.jpg')
    expect(getFilePathFromUrl(firebaseStorageUrl2)).toBe('profiles/1606141144880.jpg')
    expect(getFilePathFromUrl(invalidStorageUrl)).toBeNull()
  })
})
