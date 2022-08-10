import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    constructor(
        private snackbar: MatSnackBar
    ) { }

    show(message: string) {
        this.snackbar.open(message, null, {
            duration: 3000,
            verticalPosition: 'top'
        });
    }
    error(message: string) {
        this.snackbar.open('[ERROR]: ' + message, 'OK', {
            duration: 10000,
            verticalPosition: 'top',
            panelClass: 'error-snackbar'
        });
    }
}
