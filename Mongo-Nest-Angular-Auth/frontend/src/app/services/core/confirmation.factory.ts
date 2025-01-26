import { Injectable } from '@angular/core'
import {
  ConfirmationAction,
  ConfirmationDialogType,
  ConfirmationParams,
  TitleAndBody
} from '~/app/types/confirmation-dialog.types'
import { Confirmation } from '~/app/types/confirmation'
import { BaseDialogFactory } from '~/app/services/core/base-dialog.factory'

const INITIAL_DATA: ConfirmationParams = {
  type: ConfirmationDialogType.INFO,
  title: '',
  body: '',
  actions: [ConfirmationAction.OK],
  width: '320px'
}

@Injectable({ providedIn: 'root' })
export class ConfirmationFactory {
  constructor(private baseDialogFactory: BaseDialogFactory) {}

  /**
   * Creates a confirmation dialog.
   *
   * @param text: An object containing the title and body.
   * @param type: Type of the dialog
   *
   * @return  The ready-to-use Confirmation instance.
   */
  public create(
    text: TitleAndBody,
    type?: ConfirmationDialogType
  ): Confirmation<ConfirmationAction.OK> {
    const confirmation = new Confirmation<ConfirmationAction.OK>(this.baseDialogFactory, {
      ...INITIAL_DATA,
      type
    })
    confirmation.text(text)
    return confirmation
  }

  /**
   * Generates an INFO dialog. By default it has an simple OK button.
   * Purpose: To indicate that something was done successfully.
   *
   * @param text: An object containing the title and body.
   *
   * @return  The ready-to-use Confirmation instance.
   */
  public info(text: TitleAndBody): Confirmation<ConfirmationAction.OK> {
    return this.create(text)
  }

  /**
   * Generates a SUCCESS dialog. By default it has an simple OK button.
   * Purpose: To indicate that something was done successfully.
   *
   * @param text: An object containing the title and body.
   *
   * @return  The ready-to-use Confirmation instance.
   */
  public success(text: TitleAndBody): Confirmation<ConfirmationAction.OK> {
    return this.create(text)
  }

  /**
   * Generates a ERROR dialog. By default it has an simple OK button.
   * Purpose: To indicate that an operation failed.
   *
   * @param text: An object containing the title and body.
   *
   * @return  The ready-to-use Confirmation instance.
   */
  public error(text: TitleAndBody): Confirmation<ConfirmationAction.OK> {
    return this.create(text)
  }

  /**
   * Generates a QUESTION dialog. By default it has a Yes / No option
   * Purpose: To ask generic yes / no questions from the user
   *
   * @param text: An object containing the title and body.
   *
   * @return  The ready-to-use Confirmation instance.
   */
  public question(
    text: TitleAndBody
  ): Confirmation<ConfirmationAction.NO | ConfirmationAction.YES> {
    return this.create(text).yesNo()
  }

  /**
   * Generates a WARNING dialog. By default it has an OK and Cancel button.
   * Purpose: To indicate that something is going to happen which needs the user's attention
   *
   * @param text: An object containing the title and body.
   *
   * @return  The ready-to-use Confirmation instance.
   */
  public warning(
    text: TitleAndBody
  ): Confirmation<ConfirmationAction.OK | ConfirmationAction.CANCEL> {
    return this.create(text).okCancel()
  }
}
