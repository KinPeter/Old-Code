import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { SearchDataTransferService } from 'src/app/services/search-data-transfer.service';
import { Day } from '../../interfaces/user';
import { SitterView } from 'src/app/interfaces/sitterView';
import {Sitter} from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-sitter-calendar',
    templateUrl: './sitter-calendar.component.html',
    styleUrls: ['./sitter-calendar.component.scss']
})
export class SitterCalendarComponent implements OnInit {

    // flag, ami azt állítja, hogy mely funckiók működjenek:
    // TRUE: ha keresés után egy Sitter profilját nézegetjük
    // FALSE: ha a Sitter a saját profilját -> naptárját szerkeszti épp
    @Input() isComingFromSitterProfile = false;

    @Input() viewedSitter: SitterView | Sitter;

    @Output() updateAvailabilities = new EventEmitter<Day[]>();

    public availabilities: Day[];
    public showConfirmDialog = false;
    public showConfirmDialogSpinner = false;
    public chosenDay: Day;
    public showBookingSuccessAlert = false;
    public showBookingErrorAlert = false;
    public showNotLoggedInAlert = false;

    constructor(
        public auth: AuthenticationService,
        public dataService: SearchDataTransferService,
        public userService: UserService
    ) {}

    ngOnInit() {
        this.availabilities = this.viewedSitter.availabilities;
        this.setBlankDays();
        // console.log(this.availabilities);
    }

    // a template-en az *ngFor-ban használja, eszerint kapja meg, milyen színű legyen
    getMyClass(day: Day): string {
        switch (day.availability) {
            case 'FREE':
                return 'free';
            case 'LIMITED':
                return 'limited';
            case 'BUSY':
                return 'busy';
            default:
                return 'blank';
        }
    }

    // a listában megadott napok előtti és utáni napokat tölti ki, hogy a naptrában "eltolja" őket
    // a megfelelő kezdőnapra
    private setBlankDays(): void {
        // megnézi, milyen napra esik az első nap a listában
        const firstDayInList: number = new Date(this.availabilities[0].date).getDay();
        // Day objektum a szürke töltelék napoknak
        const blankDay: Day = {id: -1, availability: 'BLANK', date: '1970.01.01'};

        // ha az első nap vasárnap, 6 üres nap kell előre és hátra is
        if (firstDayInList === 0) {
            for (let i = 0; i < 6; i++) {
                this.availabilities.unshift(blankDay);
                this.availabilities.push(blankDay);
            }

        // ha hétfő, akkor előre semmi, végére 5
        } else if (firstDayInList === 1) {
            for (let i = 0; i < 5; i++) { this.availabilities.push(blankDay); }

        // egyébként meg elejére firstDayInList-1 üres nap, végére 6-firstDayInList nap
        } else {
            for (let i = 0; i < firstDayInList - 1; i++) { this.availabilities.unshift(blankDay); }
            for (let i = 0; i < 6 - firstDayInList; i++) { this.availabilities.push(blankDay); }
        }
    }

    clickMe(day: Day): void {
        // csak akkor csináljon bármit, ha nem "szürke töltelék" napra kattintott
        if (day.availability !== 'BLANK') {
            // ha a sitter-profile oldalon vagyunk épp, és a felhasználó be van jelentkezve:
            if (this.isComingFromSitterProfile && this.auth.currentUser) {
                // üzenet küldése a Sitternek
                this.chosenDay = day;
                this.showConfirmSendingDialog(day);

            // ha a sitter-profile oldalon vagyunk épp, de a felhasználó nincs bejelentkezve:
            } else if (this.isComingFromSitterProfile && !this.auth.currentUser) {
                this.showNotLoggedInAlert = true;
                setTimeout(() => { this.showNotLoggedInAlert = false; }, 3000);

            // ha a profilszerkesztő oldalon vagyunk épp:
            } else if (!this.isComingFromSitterProfile && this.auth.currentUser) {
                // az adott nap szerkesztése a naptárban
                this.setAvailability(day);
                // kiszedi a BLANK napokat, hogy szerkesztés után anélkül küldhessük vissza a szerverre
                const newAvailabilities = this.userService.removeBlankDays(this.availabilities);
                // console.log(newAvailabilities);
                this.updateAvailabilities.emit(newAvailabilities);
            }
        }
    }

    private showConfirmSendingDialog(day: Day): void {
        this.showConfirmDialog = true;
        this.chosenDay = day;
    }

    cancelSendingCloseDialog(): void {
        this.showConfirmDialog = false;
        this.chosenDay = null;
    }

    confirmSendBooking(): void {
        this.showConfirmDialogSpinner = true;
        this.dataService.sendMessageToSitterWithDay(this.chosenDay)
        .then((response) => {
            this.showBookingSuccessAlert = true;
            console.log('%cConfirmSendBooking .THEN()', 'color:green;font-weight:bold;');
            setTimeout(() => { this.showBookingSuccessAlert = false; }, 3000);
        })
        .catch((error) => {
            this.showBookingErrorAlert = true;
            console.log('%cConfirmSendBooking .CATCH()', 'color:green;font-weight:bold;');
            setTimeout(() => { this.showBookingErrorAlert = false; }, 3000);
        })
        .finally(() => {
            this.showConfirmDialogSpinner = false;
            this.showConfirmDialog = false;
        });
    }

    private setAvailability(day: Day): void {
        switch (day.availability) {
            case 'FREE':
                day.availability = 'LIMITED';
                break;
            case 'LIMITED':
                day.availability = 'BUSY';
                break;
            case 'BUSY':
                day.availability = 'FREE';
                break;
            default:
                return;
        }
    }

}
