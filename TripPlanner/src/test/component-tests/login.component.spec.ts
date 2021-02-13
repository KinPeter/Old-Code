import { AbstractControl } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateService } from '@ngx-translate/core'
import { SharedModule } from '~/app/modules/common/shared.module'
import { MockTranslateService } from '~/test/mocks/mock-translate.service'
import { MockTranslatePipe } from '~/test/mocks/mock-translate.pipe'
import { LoginComponent } from '~/app/modules/auth/login/login.component'
import { AuthService } from '~/app/services/auth/auth.service'
import { MockAuthService } from '~/test/mocks/mock-auth.service'
import { AuthDialogFactory } from '~/app/modules/auth/auth-dialog.factory'
import { MockAuthDialogFactory } from '~/test/mocks/mock-auth-dialog.factory'

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>
  let c: LoginComponent
  let el: HTMLElement
  let controls: { [p: string]: AbstractControl }
  let email: AbstractControl
  let password: AbstractControl

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule, SharedModule],
      declarations: [LoginComponent, MockTranslatePipe],
      providers: [
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: AuthDialogFactory, useClass: MockAuthDialogFactory }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent)
        c = fixture.componentInstance
        el = fixture.debugElement.nativeElement
        fixture.detectChanges()

        controls = c.form.controls
        email = controls.email
        password = controls.password
      })
  })

  it('should create the component with a form', () => {
    expect(c).toBeTruthy()
    expect(c.form).toBeTruthy()
    expect(c.form.controls.email).toBeTruthy()
    expect(c.form.controls.email.value).toBe('')
    expect(c.form.controls.password).toBeTruthy()
    expect(c.form.controls.password.value).toBe('')
    expect(c.form.valid).toBeFalse()
  })

  it('should validate the login form', () => {
    const button = el.querySelector('button') as HTMLButtonElement
    email.setValue('something')
    password.setValue('asdasd')
    expect(c.form.valid).toBeFalse()
    expect(email.hasError('email')).toBeTrue()
    fixture.detectChanges()
    expect(button.disabled).toBeTrue()

    email.setValue('')
    password.setValue('')
    expect(c.form.valid).toBeFalse()
    expect(email.hasError('email')).toBeFalse()
    expect(email.hasError('required')).toBeTrue()
    expect(password.hasError('required')).toBeTrue()
    fixture.detectChanges()
    expect(button.disabled).toBeTrue()

    email.setValue('lajos@gmail.com')
    password.setValue('')
    expect(c.form.valid).toBeFalse()
    expect(email.valid).toBeTrue()
    expect(password.hasError('required')).toBeTrue()
    fixture.detectChanges()
    expect(button.disabled).toBeTrue()

    email.setValue('lajos@gmail.com')
    password.setValue('asd123')
    expect(c.form.valid).toBeTrue()
    fixture.detectChanges()
    expect(button.disabled).toBeFalse()
  })

  it('should call to open a dialog on forgot link clicked', () => {
    spyOn(c, 'onForgotPassword')

    el.querySelector('a').click()
    expect(c.onForgotPassword).toHaveBeenCalledTimes(1)
  })
})
