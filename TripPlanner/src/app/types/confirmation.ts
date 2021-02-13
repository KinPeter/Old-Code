import { ConfirmationAction, ConfirmationParams, TitleAndBody } from './confirmation-dialog.types'
import { BaseDialogFactory } from '~/app/services/core/base-dialog.factory'
import { ConfirmationDialogComponent } from '~/app/modules/core/confirmation-dialog/confirmation-dialog.component'

export class Confirmation<R = ConfirmationAction> {
  private readonly data: ConfirmationParams

  constructor(private baseDialogFactory: BaseDialogFactory, initialData: ConfirmationParams) {
    this.data = { ...initialData }
  }

  /**
   * Sets the title of the dialog.
   */
  public title(val: string): Confirmation<R> {
    this.data.title = val
    return this
  }

  /**
   * Sets the main text of the dialog.
   */
  public body(val: string): Confirmation<R> {
    this.data.body = val
    return this
  }

  /**
   * Sets the title and body of the dialog in one go
   */
  public text(data: TitleAndBody): Confirmation<R> {
    return this.title(data.title).body(data.body)
  }

  /**
   * Sets the max width of the dialog. Use css format (eg: '400px' or '50vw')
   */
  public width(val: string): Confirmation<R> {
    this.data.width = val
    return this
  }

  /**
   * Set the action buttons to be visible in the dialog. When the dialog is closed the response
   * will be one of this buttons, or undefined if no button was chosen.
   */
  public actions<R extends ConfirmationAction>(val: R[]): Confirmation<R> {
    this.data.actions = val
    return (this as unknown) as Confirmation<R>
  }

  /**
   * Displays the confirmation dialog.
   *
   * @return A promise which resolves when the window is closed
   */
  public show(): Promise<R> {
    const ref = this.baseDialogFactory.open<ConfirmationDialogComponent, ConfirmationParams, R>(
      ConfirmationDialogComponent,
      {
        data: this.data,
        width: this.data.width,
        autoFocus: false
      }
    )

    return ref.afterClosed().toPromise()
  }

  /**
   * Sets the action buttons to be a yes/no pair.
   *
   * @param primary Sets which option be the prominent (and selected by default)
   */
  public yesNo(
    primary: ConfirmationAction.YES | ConfirmationAction.NO = ConfirmationAction.YES
  ): Confirmation<ConfirmationAction.NO | ConfirmationAction.YES> {
    return this.actions(
      primary === ConfirmationAction.NO
        ? [ConfirmationAction.YES, ConfirmationAction.NO]
        : [ConfirmationAction.NO, ConfirmationAction.YES]
    )
  }

  /**
   * Sets the action buttons to be a ok/cancel pair.
   *
   * @param primary Sets which option be the prominent (and selected by default)
   */
  public okCancel(
    primary: ConfirmationAction.CANCEL | ConfirmationAction.OK = ConfirmationAction.OK
  ): Confirmation<ConfirmationAction.CANCEL | ConfirmationAction.OK> {
    return this.actions(
      primary === ConfirmationAction.CANCEL
        ? [ConfirmationAction.OK, ConfirmationAction.CANCEL]
        : [ConfirmationAction.CANCEL, ConfirmationAction.OK]
    )
  }
}
