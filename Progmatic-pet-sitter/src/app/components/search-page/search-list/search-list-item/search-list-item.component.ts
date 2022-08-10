import { Component, OnInit, Input } from '@angular/core';
import { SearchedSitter } from 'src/app/interfaces/searchedSitter';
import { SearchDataTransferService } from 'src/app/services/search-data-transfer.service';
import { herokuURL } from 'src/app/app-settings';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: '[app-search-list-item]',
  templateUrl: './search-list-item.component.html',
  styleUrls: ['./search-list-item.component.scss']
})
export class SearchListItemComponent implements OnInit {

  @Input()
  public sitter: SearchedSitter;
  public imgUrl: string;
  public ratingFullStars: any[] = new Array(0); // üres helyek lesznek benne, csak *ngFor-hoz kell, hogy legyen hossza
  public ratingHalfStars: any[] = new Array(0);
  public ratingEmptyStars: any[] = new Array(5);

  constructor(
    private searchDataService: SearchDataTransferService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.setRatingStars();
    this.setProfilePicUrl();

  }
  setRatingStars(): void {
    const rating = this.sitter.averageRating;
    if (typeof (rating) !== 'number' || Number.isNaN(rating) || !rating) {
      return;
    } else {
      const roundedRating = +(Math.round(rating * 2) / 2).toFixed(1);
      this.ratingFullStars = new Array(Math.floor(roundedRating));
      this.ratingHalfStars = new Array((roundedRating % 1 === 0 ? 0 : 1));
      this.ratingEmptyStars = new Array(5 - (this.ratingFullStars.length + this.ratingHalfStars.length));
    }
  }

  setProfilePicUrl(): void {
    this.userService.checkPictureEndpoint(this.sitter.id)
      .then((response) => {
        this.imgUrl = herokuURL + '/user/' + this.sitter.id + '/image';
      })
      .catch((error) => {
        this.imgUrl = '/assets/images/defaultAvatar.png';
      });
  }


}
