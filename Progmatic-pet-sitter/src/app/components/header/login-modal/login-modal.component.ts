import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { LoginData } from 'src/app/interfaces/login-data';
import { FieldValidatorService } from 'src/app/services/field-validator.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss'],
    animations: [
        trigger('backdropFade', [
            state('in', style({
                opacity: 1
            })),
            transition('void => *', [ // fade-in animation
                style({ // initial style, before added to the DOM
                    opacity: 0
                }),
                animate(300)
            ]),
            transition('* => void', [ // fade-out animation
                animate(300, style({
                    opacity: 0,
                }))
            ])
        ]),
        trigger('modalSlide', [
            state('in', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            transition('void => *', [ // slide-in animation
                animate(400, keyframes([
                    style({
                        transform: 'translateY(-500px) scale(0.3)',
                        opacity: 0,
                        offset: 0 // offset means the fraction of time of the whole animation time
                    }),
                    style({
                        transform: 'translateY(200px) scale(0.65)',
                        opacity: 0.2,
                        offset: 0.6
                    }),
                    style({
                        transform: 'translateY(0) scale(1)',
                        opacity: 1,
                        offset: 1
                    })
                ]))
            ]),
            transition('* => void', [ // slide-out animation
                animate(300, style({
                    opacity: 0,
                    transform: 'translateY(-500px)'
                }))
            ])
        ])
    ]
})
export class LoginModalComponent implements OnInit {

    @Output() closeThis = new EventEmitter();
    public loginData: LoginData;
    public isEmailValid = true;
    public isPasswordValid = true;
    public isLoading = false;
    public isLoginSuccessful = false;
    public isLoginError = -1;
    public isForgotPasswordSuccessful = false;
    public isForgotPasswordError = false;

    constructor(
        private validator: FieldValidatorService,
        private auth: AuthenticationService
    ) {
        this.loginData = {
            email: '',
            password: ''
        };
    }

    // ---- getters/setters for unitTests:
    setLoginData(email: string, password: string) {
        this.loginData.email = email;
        this.loginData.password = password;
    }
    getIsEmailValid() {
        return this.isEmailValid;
    }
    getIsPasswordValid() {
        return this.isPasswordValid;
    }
    setErrorSuccessFlags(error: number, success: boolean) {
        this.isLoginError = error;
        this.isLoginSuccessful = success;
    }
    getLoginError() {
        return this.isLoginError;
    }
    getLoginSuccess() {
        return this.isLoginSuccessful;
    }
    // -----------------------------------

    closeMe() {
        this.closeThis.emit();
        this.isLoginError = -1;
        this.isLoginSuccessful = false;
        this.isForgotPasswordSuccessful = false;
        this.isForgotPasswordError = false;
    }

    sendLoginData(): void {
        this.isEmailValid = this.validator.validateEmail(this.loginData.email);
        this.isPasswordValid = this.loginData.password !== '';

        if (this.isEmailValid && this.isPasswordValid) {
            this.isLoading = true;

            this.auth.login(this.loginData).then((response) => {
                this.isLoginSuccessful = true;
                setTimeout(() => { this.closeMe(); }, 1500);
            })
            .catch((error) => {
                this.isLoginError = error.status;
                setTimeout(() => { this.closeMe(); }, 5000);
            })
            .finally(() => {
                this.isLoading = false;
            });
        }
    }

    sendForgotPassword(): void {
        this.isEmailValid = this.validator.validateEmail(this.loginData.email);
        if (this.isEmailValid) {
            this.isLoading = true;
            this.auth.sendForgotPasswordRequest(this.loginData.email)
            .then((response) => {
                this.isForgotPasswordSuccessful = true;
                setTimeout(() => { this.closeMe(); }, 5000);
            })
            .catch((error) => {
                this.isForgotPasswordError = true;
                setTimeout(() => { this.closeMe(); }, 5000);
            })
            .finally(() => {
                this.isLoading = false;
            });
        }
    }

    ngOnInit() {
    }

}
