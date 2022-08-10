import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

    private authSub: Subscription;
    isLoggedIn: boolean;

    constructor(
        private auth: AuthService
    ) { }

    ngOnInit() {
        this.authSub = this.auth.authChange.subscribe((status) => {
            this.isLoggedIn = status;
        });
    }

    onSubmit(form: NgForm) {
        this.auth.login(form.value.email, form.value.password);
    }

    ngOnDestroy() {
        if (this.authSub) {
            this.authSub.unsubscribe();
        }
    }

}
