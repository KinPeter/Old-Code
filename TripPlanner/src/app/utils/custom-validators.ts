import { AbstractControl } from '@angular/forms'

export class CustomValidators {
  public static passwordsMatch(c: AbstractControl): { notMatch: boolean } {
    if (!c.get('password') || !c.get('confirmPassword'))
      throw new Error('Form control must have the proper fields')
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { notMatch: true }
    }
  }

  public static arrayNotEmpty(c: AbstractControl): { arrayEmpty: boolean } {
    if (!Array.isArray(c.value)) throw new Error('Control value is not an array')
    if (c.value.length < 1) {
      return { arrayEmpty: true }
    }
  }

  public static validDateRange(c: AbstractControl): { invalidDates: boolean } {
    if (!c.get('startingDate') || !c.get('endingDate'))
      throw new Error('Form control must have the proper fields')
    if (c.get('startingDate').value > c.get('endingDate').value) {
      return { invalidDates: true }
    }
  }

  public static url(c: AbstractControl): { invalidUrl: boolean } {
    const urlRegex = new RegExp(
      /^https?:\/\/(www\.)?[a-zA-Z0-9@:%._+~#=-]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/
    )
    if (c.value && !urlRegex.test(c.value)) {
      return { invalidUrl: true }
    }
  }
}
