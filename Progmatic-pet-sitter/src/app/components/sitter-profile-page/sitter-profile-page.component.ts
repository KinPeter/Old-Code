import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchDataTransferService } from 'src/app/services/search-data-transfer.service';
import { SitterView } from 'src/app/interfaces/sitterView';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { herokuURL } from 'src/app/app-settings';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-sitter-profile-page',
    templateUrl: './sitter-profile-page.component.html',
    styleUrls: ['./sitter-profile-page.component.scss']
})
export class SitterProfilePageComponent implements OnInit {
    public isLoading = true;
    public isUserLoggedIn = false;
    public sitter: SitterView;
    public sitterNotFound = false;
    public ratingToSend = 5;
    public showRatingSuccess = false;
    public showRatingError = false;
    public ratingFullStars: any[] = new Array(0); // üres helyek lesznek benne, csak *ngFor-hoz kell, hogy legyen hossza
    public ratingHalfStars: any[] = new Array(0);
    public ratingEmptyStars: any[] = new Array(5);
    public profilePicUrl: string;

    constructor(
        public searchData: SearchDataTransferService,
        public route: ActivatedRoute,
        public auth: AuthenticationService,
        public userService: UserService ) {}

    ngOnInit() {
        const sitterId = this.route.snapshot.params.sitter_id;
        this.searchData.getSitterProfile(sitterId)
            .then((response) => {
                this.sitter = response;
                this.setRatingStars();
                this.setProfilePicUrl();
            })
            .catch((error) => {
                this.sitter = null;
                this.sitterNotFound = true;
            })
            .finally(() => {
                this.isLoading = false;
            });
        this.auth.isUserLoggedIn.subscribe(value => {
            this.isUserLoggedIn = value;
        });
    }

    setProfilePicUrl(): void {
        this.userService.checkPictureEndpoint(this.sitter.id)
            .then((response) => {
                this.profilePicUrl = herokuURL + '/user/' + this.sitter.id + '/image';
            })
            .catch((error) => {
                this.profilePicUrl = '/assets/images/defaultAvatar.png';
            });
    }

    setRatingStars(): void {
        const rating = this.sitter.averageRating;
        if (typeof(rating) !== 'number' || Number.isNaN(rating) || !rating) {
            return;
        } else {
            const roundedRating = +(Math.round(rating * 2) / 2).toFixed(1);
            this.ratingFullStars = new Array(Math.floor(roundedRating));
            this.ratingHalfStars = new Array((roundedRating % 1 === 0 ? 0 : 1));
            this.ratingEmptyStars = new Array(5 - (this.ratingFullStars.length + this.ratingHalfStars.length));
        }
    }


    getPlaceOfService(place: string): string {
        switch (place) {
            case 'OWNERS_HOME':
                return 'Házhoz megyek';
            case 'SITTERS_HOME':
                return 'Az én otthonomban';
            default:
                return '';
        }
    }
    getPetType(type: string): string {
        switch (type) {
            case 'DOG':
                return 'Kutya';
            case 'CAT':
                return 'Macska';
            case 'BIRD':
                return 'Madár';
            case 'RODENT':
                return 'Rágcsáló';
            case 'REPTILE':
                return 'Hüllő';
            default:
                return '';
        }
    }

    sendRating() {
        this.searchData.sendSitterRating(this.sitter.id, this.ratingToSend)
        .then((response) => {
            this.showRatingSuccess = true;
            this.sitter.averageRating = response.averageRating;
            this.setRatingStars();
            this.sitter.numberOfRatings = response.numberOfRatings;
            setTimeout(() => {this.showRatingSuccess = false; }, 2000);
        })
        .catch((error) => {
            this.showRatingError = true;
            setTimeout(() => { this.showRatingError = false; }, 2000);
        });
    }


}
