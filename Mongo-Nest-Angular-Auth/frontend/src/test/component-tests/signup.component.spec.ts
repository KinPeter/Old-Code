import { AbstractControl } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateService } from '@ngx-translate/core'
import { SharedModule } from '~/app/modules/common/shared.module'
import { UserService } from '~/app/services/user/user.service'
import { SignupComponent } from '~/app/modules/auth/signup/signup.component'
import { MockUserService } from '~/test/mocks/mock-user.service'
import { MockTranslateService } from '~/test/mocks/mock-translate.service'
import { MockTranslatePipe } from '~/test/mocks/mock-translate.pipe'

describe('SignupComponent', () => {
  let fixture: ComponentFixture<SignupComponent>
  let c: SignupComponent
  let el: HTMLElement
  let controls: { [p: string]: AbstractControl }
  let email: AbstractControl
  let name: AbstractControl
  let passwords: AbstractControl
  let password: AbstractControl
  let confirm: AbstractControl

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule, SharedModule],
      declarations: [SignupComponent, MockTranslatePipe],
      providers: [
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: UserService, useClass: MockUserService }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SignupComponent)
        c = fixture.componentInstance
        el = fixture.debugElement.nativeElement
        fixture.detectChanges()

        controls = c.form.controls
        email = controls.email
        name = controls.displayName
        passwords = controls.passwords
        password = passwords.get('password')
        confirm = passwords.get('confirmPassword')
      })
  })

  it('should create the component with a form', () => {
    expect(c).toBeTruthy()
    expect(c.form).toBeTruthy()
    expect(c.form.controls.displayName).toBeTruthy()
    expect(c.form.controls.displayName.value).toBe('')
    expect(c.form.controls.email).toBeTruthy()
    expect(c.form.controls.email.value).toBe('')
    expect(c.form.controls.passwords).toBeTruthy()
    expect(c.form.controls.passwords.get('password')).toBeTruthy()
    expect(c.form.controls.passwords.get('password').value).toBe('')
    expect(c.form.controls.passwords.get('confirmPassword')).toBeTruthy()
    expect(c.form.controls.passwords.get('confirmPassword').value).toBe('')
    expect(c.form.valid).toBeFalse()
  })

  it('should validate the signup form', () => {
    const button = el.querySelector('button') as HTMLButtonElement
    name.setValue('')
    email.setValue('something')
    password.setValue('asdasd')
    confirm.setValue('asd123')
    expect(c.form.valid).toBeFalse()
    expect(name.hasError('required')).toBeTrue()
    expect(email.hasError('email')).toBeTrue()
    expect(passwords.hasError('notMatch')).toBeTrue()
    fixture.detectChanges()
    expect(button.disabled).toBeTrue()

    name.setValue('Lajos')
    email.setValue('')
    password.setValue('asd')
    confirm.setValue('asd')
    expect(c.form.valid).toBeFalse()
    expect(name.valid).toBeTrue()
    expect(email.hasError('email')).toBeFalse()
    expect(email.hasError('required')).toBeTrue()
    expect(password.hasError('minlength')).toBeTrue()
    expect(passwords.hasError('notMatch')).toBeFalse()
    fixture.detectChanges()
    expect(button.disabled).toBeTrue()

    name.setValue('Lajos')
    email.setValue('lajos@gmail.com')
    password.setValue('')
    confirm.setValue('')
    expect(c.form.valid).toBeFalse()
    expect(name.valid).toBeTrue()
    expect(email.valid).toBeTrue()
    expect(password.hasError('required')).toBeTrue()
    expect(confirm.hasError('required')).toBeTrue()
    expect(passwords.hasError('notMatch')).toBeFalse()
    fixture.detectChanges()
    expect(button.disabled).toBeTrue()

    name.setValue('Lajos')
    email.setValue('lajos@gmail.com')
    password.setValue('asd123')
    confirm.setValue('asd123')
    expect(c.form.valid).toBeTrue()
    fixture.detectChanges()
    expect(button.disabled).toBeFalse()
  })

  it('should submit the form and emit the email', async () => {
    spyOn(c.success, 'emit')

    name.setValue('Lajos')
    email.setValue('lajos@gmail.com')
    password.setValue('asd123')
    confirm.setValue('asd123')
    await c.onSubmit()
    expect(c.success.emit).toHaveBeenCalledTimes(1)
    expect(c.success.emit).toHaveBeenCalledWith('lajos@gmail.com')
  })
})
