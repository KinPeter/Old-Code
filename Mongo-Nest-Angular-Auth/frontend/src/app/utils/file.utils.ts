export function getExtension(filename: string): string {
  const split = filename.trim().split('.')
  return split[split.length - 1]
}

export function getFilePathFromUrl(url: string): string {
  const regex = new RegExp(/(trips|profiles)%2F\d+.(jpg|jpeg|png)/)
  const matches = regex.exec(url)
  return !matches || !matches.length ? null : matches[0].replace('%2F', '/')
}

export function loadFileToImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      resolve(image)
    }
    image.onerror = () => {
      reject(new Error())
    }
    image.src = URL.createObjectURL(file)
  })
}

export type FileType = 'image/jpeg' | 'image/png'

export interface FileRules {
  allowedTypes: FileType[]
  maxFileSize: number
  minImageWidth: number
  minImageHeight: number
}

export interface FileValidation {
  valid: boolean
  errors: {
    fileType: boolean
    fileSize: boolean
    imageSize: boolean
  }
}

export const defaultFileValidation: FileValidation = {
  valid: true,
  errors: {
    fileType: false,
    fileSize: false,
    imageSize: false
  }
}

export async function validateFile(file: File, rules: FileRules): Promise<FileValidation> {
  const validation = {
    ...defaultFileValidation,
    errors: { ...defaultFileValidation.errors }
  }

  if (!rules.allowedTypes.includes(file.type as FileType)) {
    validation.valid = false
    validation.errors.fileType = true
    return validation
  }
  if (file.size > rules.maxFileSize * 1024 * 1024) {
    validation.valid = false
    validation.errors.fileSize = true
  }
  const image = await loadFileToImage(file)
  if (image.width < rules.minImageWidth || image.height < rules.minImageHeight) {
    validation.valid = false
    validation.errors.imageSize = true
  }
  return validation
}
