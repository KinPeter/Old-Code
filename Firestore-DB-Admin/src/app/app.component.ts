import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { SpinnerService } from './spinner.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    isLoggedIn: boolean;
    loading = false;

    constructor(
        private auth: AuthService,
        private spinner: SpinnerService
    ) {}

    ngOnInit() {
        this.spinner.loading.subscribe((status) => {
            this.loading = status;
        });
        this.auth.initAuthListener();
        this.auth.authChange.subscribe((status) => {
            this.isLoggedIn = status;
        });
    }

    logout() {
        this.auth.logout();
    }
}
