import { FormBuilder, FormControl } from '@angular/forms'
import { CustomValidators } from '~/app/utils/custom-validators'

describe('Custom Validators passwordsMatch', () => {
  it('should validate if two passwords match', () => {
    const controlGroup = new FormBuilder().group({
      password: [null],
      confirmPassword: [null]
    })

    controlGroup.get('password').setValue('asd')
    controlGroup.get('confirmPassword').setValue('asd')
    expect(CustomValidators.passwordsMatch(controlGroup)).toBeUndefined()

    controlGroup.get('password').setValue('123')
    controlGroup.get('confirmPassword').setValue('asd')
    expect(CustomValidators.passwordsMatch(controlGroup)).toEqual({ notMatch: true })

    controlGroup.get('password').setValue(null)
    controlGroup.get('confirmPassword').setValue('asd')
    expect(CustomValidators.passwordsMatch(controlGroup)).toEqual({ notMatch: true })

    controlGroup.get('password').setValue('AsD123')
    controlGroup.get('confirmPassword').setValue('')
    expect(CustomValidators.passwordsMatch(controlGroup)).toEqual({ notMatch: true })
  })

  it('should throw an error if no proper form fields', () => {
    expect(() => CustomValidators.passwordsMatch(new FormControl())).toThrowError()

    const controlGroup1 = new FormBuilder().group({
      password: [null],
      otherPassword: [null]
    })
    expect(() => CustomValidators.passwordsMatch(controlGroup1)).toThrowError()

    const controlGroup2 = new FormBuilder().group({
      password: [null]
    })
    expect(() => CustomValidators.passwordsMatch(controlGroup2)).toThrowError()
  })
})

describe('Custom Validators arrayNotEmpty', () => {
  it('should validate if an array is not empty', () => {
    const control = new FormControl([])

    expect(CustomValidators.arrayNotEmpty(control)).toEqual({ arrayEmpty: true })

    control.setValue([1])
    expect(CustomValidators.arrayNotEmpty(control)).toBeUndefined()

    control.setValue([1, 2])
    expect(CustomValidators.arrayNotEmpty(control)).toBeUndefined()

    control.setValue(['string', 'another'])
    expect(CustomValidators.arrayNotEmpty(control)).toBeUndefined()

    control.setValue([])
    expect(CustomValidators.arrayNotEmpty(control)).toEqual({ arrayEmpty: true })
  })

  it('should throw an error if value is not an array', () => {
    const control = new FormControl(null)

    expect(() => CustomValidators.arrayNotEmpty(control)).toThrowError()

    control.setValue(123)
    expect(() => CustomValidators.arrayNotEmpty(control)).toThrowError()

    control.setValue('some string')
    expect(() => CustomValidators.arrayNotEmpty(control)).toThrowError()
  })
})

describe('Custom Validators validDateRange', () => {
  it('should validate if ending date is not before starting date', () => {
    const controlGroup = new FormBuilder().group({
      startingDate: [new Date(2020, 10, 20)],
      endingDate: [new Date(2020, 10, 20)]
    })

    expect(CustomValidators.validDateRange(controlGroup)).toBeUndefined()

    controlGroup.get('startingDate').setValue(new Date(2020, 10, 20))
    controlGroup.get('endingDate').setValue(new Date(2020, 10, 23))
    expect(CustomValidators.validDateRange(controlGroup)).toBeUndefined()

    controlGroup.get('startingDate').setValue(new Date(2020, 10, 20))
    controlGroup.get('endingDate').setValue(new Date(2020, 10, 19))
    expect(CustomValidators.validDateRange(controlGroup)).toEqual({ invalidDates: true })

    controlGroup.get('startingDate').setValue(new Date(2020, 10, 20))
    controlGroup.get('endingDate').setValue(new Date(2019, 10, 20))
    expect(CustomValidators.validDateRange(controlGroup)).toEqual({ invalidDates: true })
  })

  it('should throw an error if no proper form fields', () => {
    expect(() => CustomValidators.validDateRange(new FormControl())).toThrowError()

    const controlGroup1 = new FormBuilder().group({
      sDate: [new Date()],
      eDate: [new Date()]
    })
    expect(() => CustomValidators.validDateRange(controlGroup1)).toThrowError()

    const controlGroup2 = new FormBuilder().group({
      startingDate: [new Date()]
    })
    expect(() => CustomValidators.validDateRange(controlGroup2)).toThrowError()
  })
})

describe('Custom Validators url', () => {
  it('should validate a string as an url if it has value', () => {
    const control = new FormControl(null)
    expect(CustomValidators.url(control)).toBeUndefined()

    control.setValue('')
    expect(CustomValidators.url(control)).toBeUndefined()

    control.setValue('just some random string')
    expect(CustomValidators.url(control)).toEqual({ invalidUrl: true })

    control.setValue('www.withouthttp.com')
    expect(CustomValidators.url(control)).toEqual({ invalidUrl: true })

    control.setValue('http://p-kin.com')
    expect(CustomValidators.url(control)).toBeUndefined()

    control.setValue('https://p-kin.com/games')
    expect(CustomValidators.url(control)).toBeUndefined()

    control.setValue('https://www.p-kin.com/games/something.jpg')
    expect(CustomValidators.url(control)).toBeUndefined()
  })
})
