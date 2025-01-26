// import { Directive, ElementRef, HostListener } from '@angular/core';
// import { TripService } from '~/app/services/trips/trip.service';
//
// @Directive({
//   selector: '[tripChangeCheck]',
// })
// export class TripChangeCheckDirective {
//   constructor(el: ElementRef, private tripService: TripService) {}
//
//   @HostListener('input') onInput() {
//     this.tripService.checkForChanges();
//   }
//   @HostListener('change') onChange() {
//     this.tripService.checkForChanges();
//   }
//   @HostListener('blur') onBlur() {
//     this.tripService.checkForChanges();
//   }
// }
