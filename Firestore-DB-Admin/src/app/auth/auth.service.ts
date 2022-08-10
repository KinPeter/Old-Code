import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SpinnerService } from '../spinner.service';
import { SnackbarService } from '../snackbar.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private isAuthenticated = false;
    public authChange = new Subject<boolean>();

    constructor(
        private auth: AngularFireAuth,
        private router: Router,
        private spinner: SpinnerService,
        private snackbar: SnackbarService
    ) { }

    initAuthListener() {
        this.auth.authState.subscribe((user) => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
            } else {
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/']);
            }
        });
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }

    async login(email: string, password: string) {
        this.spinner.show();
        try {
            await this.auth.auth.signInWithEmailAndPassword(email, password);
            this.snackbar.show('Login successful!');
        } catch (error) {
            console.log(error);
            this.snackbar.error(error.message);
        } finally {
            this.spinner.hide();
        }
    }

    logout() {
        this.snackbar.show('Logged out.');
        this.auth.auth.signOut();
    }
}
