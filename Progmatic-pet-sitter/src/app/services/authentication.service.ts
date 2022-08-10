import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { User } from '../interfaces/user';
import { LoginData, ForgotPasswordData } from '../interfaces/login-data';
import { herokuURL } from '../app-settings';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private URL = herokuURL;
    public currentUser: User;
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor( private http: HttpClient ) {
        this.getUserIfLoggedIn();
    }

    getUserIfLoggedIn() {
        this.http.post(this.URL + '/checkuser', {}, { withCredentials: true }).toPromise()
        .then((response: any) => {
            this.currentUser = response;
            this.isUserLoggedIn.next(true);
        })
        .catch((error) => {
            this.currentUser = null;
        });
    }

    login(data: LoginData) {
        // login details in Form Data format
        const formData = new FormData();
        formData.append('username', data.email);
        formData.append('password', data.password);

        // send POST request with form data
        return this.http.post(this.URL + '/signin', formData, { withCredentials: true }).toPromise()
            .then((response: any) => {
                this.currentUser = response.user;
                this.isUserLoggedIn.next(true);
                return response;
            })
            .catch((error) => {
                this.currentUser = null;
                throw error; // throw forward to login-modal-component
            });
    }

    sendForgotPasswordRequest(email: string): Promise<any> {
        const forgotPasswordData: ForgotPasswordData = {email};
        return this.http.post(this.URL + '/resetpassword', forgotPasswordData, {withCredentials: true}).toPromise();
    }

    logout() {
        this.http.post(this.URL + '/logout', {}, { withCredentials: true }).toPromise()
        .then((response: any) => {
            // console.log('%c@AuthenticationService --> logout().then() : SUCCESSFUL', 'color:darkorange;font-weight:bold;');
            // console.log(response);
        })
        .catch((error) => {
            // console.log('%c@AuthenticationService --> logout().catch() : ERROR', 'color:darkorange;font-weight:bold;');
            // console.log(error);
        })
        .finally(() => {
            this.isUserLoggedIn.next(false);
            this.currentUser = null;
            location.reload(true); //tslint:disable-line
        });
    }
}
