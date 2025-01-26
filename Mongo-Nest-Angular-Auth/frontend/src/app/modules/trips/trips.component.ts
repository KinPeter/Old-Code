import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

import { MyTripsService } from '~/app/services/trips/my-trips.service'
import { TripsOrder } from '~/app/types/shared.types'
import { UserService } from '~/app/services/user/user.service'
import { TripsDialogFactory } from '~/app/modules/trips/trips-dialog.factory'
import { ConfirmationFactory } from '~/app/services/core/confirmation.factory'
import { ConfirmationAction } from '~/app/types/confirmation-dialog.types'

@Component({
  selector: 'tp-trips',
  template: `
    <tp-trip-filters
      (search)="onSearch($event)"
      (orderBy)="onOrder($event)"
      (futureOnly)="onFutureOnlyChange($event)"
    ></tp-trip-filters>
    <tp-no-trips-found *ngIf="!(myTripsService.filteredTrips | async).length"></tp-no-trips-found>
    <tp-trip-grid
      *ngIf="(myTripsService.filteredTrips | async).length"
      [trips]="myTripsService.filteredTrips"
      [dateFormat]="userService.preferredDateFormat"
      (open)="onOpen($event)"
      (edit)="onEdit($event)"
      (duplicate)="onDuplicate($event)"
      (delete)="onDelete($event)"
      (printView)="onPrintView($event)"
    ></tp-trip-grid>
    <button mat-fab (click)="onCreateNew()">
      <mat-icon>add</mat-icon>
      {{ 'myTrips.createNew' | translate | uppercase }}
    </button>
  `,
  styles: [
    `
      button[mat-fab] {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
      }
      @media (min-width: 1000px) {
        button[mat-fab] {
          right: 4rem;
          bottom: 2rem;
        }
      }
    `
  ]
})
export class TripsComponent implements OnInit {
  constructor(
    public myTripsService: MyTripsService,
    public userService: UserService,
    private tripsDialogFactory: TripsDialogFactory,
    private confirmationFactory: ConfirmationFactory,
    private router: Router,
    private translate: TranslateService
  ) {
    this.myTripsService.fetchTrips({ resetFilters: true })
  }

  ngOnInit(): void {}

  public onCreateNew(): void {
    this.tripsDialogFactory.openNewTripDialog()
  }

  public onSearch(value: string): void {
    this.myTripsService.setFilter(value)
  }

  public onFutureOnlyChange(value: boolean): void {
    this.myTripsService.setFutureOnly(value)
  }

  public onOrder(orderBy: TripsOrder): void {
    this.myTripsService.setOrder(orderBy)
  }

  public onOpen(id: string): void {
    this.router.navigate(['editor', id])
  }

  public onEdit(id: string): void {
    this.tripsDialogFactory.openEditTripDialog(this.myTripsService.getTripById(id))
  }

  public onDuplicate(id: string): void {
    this.tripsDialogFactory.openDuplicateTripDialog(this.myTripsService.getTripById(id))
  }

  public async onDelete(id: string): Promise<void> {
    const trip = this.myTripsService.getTripById(id)
    const title = await this.translate.get('myTrips.messages.deleteConfirmTitle').toPromise()
    const message = await this.translate
      .get('myTrips.messages.deleteConfirmBody', { title: trip.title })
      .toPromise()
    const response = await this.confirmationFactory
      .question({
        title: title,
        body: message
      })
      .show()
    if (response === ConfirmationAction.YES) {
      await this.myTripsService.deleteTrip(id)
    }
  }

  public onPrintView(id: string): void {
    console.log('printView', id)
  }
}
