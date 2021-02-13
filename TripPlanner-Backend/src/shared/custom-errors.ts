export enum CustomApiError {
  EMAIL_REGISTERED = 'Email is already registered',
  INVALID_CREDENTIALS = 'Invalid credentials',
  UNABLE_TO_SEND = 'Unable to send email',
}

export enum CustomValidationError {
  WEAK_PASSWORD = 'Password is too weak',
  INVALID_DATE_FORMAT = 'Not a valid date format',
}
