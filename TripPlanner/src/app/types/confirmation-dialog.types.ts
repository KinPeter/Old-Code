/**
 * Defines a confirmation
 */
export interface ConfirmationParams {
  type: ConfirmationDialogType
  title: string
  body: string
  actions: ConfirmationAction[]
  width?: string
}

/**
 * Defines action buttons that can be shown in a confirmation dialog
 */
export enum ConfirmationAction {
  CANCEL = 'CANCEL',
  NO = 'NO',
  OK = 'OK',
  YES = 'YES'
}

/**
 * Defines the title and body text in the dialog
 */
export interface TitleAndBody {
  title?: string
  body: string
}

/**
 * Defines the type of the dialog for theming
 */
export enum ConfirmationDialogType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}
