import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tp-editor-toolbar',
  template: `
    <div class="planner-main-toolbar">
      <div class="d-flex">
        <button
          mat-fab
          class="ml-2"
          color="primary"
          matTooltip="Save Changes"
          [disabled]="saveDisabled"
          (click)="saveChanges.emit()"
        >
          <mat-icon>save</mat-icon>
        </button>
        <div
          class="ml-2"
          matTooltip="Save your changes first to enter Print View"
          [matTooltipDisabled]="saveDisabled"
        >
          <button
            mat-fab
            color="primary"
            matTooltip="Open Print View"
            [disabled]="!saveDisabled"
            (click)="openPrintView.emit()"
          >
            <mat-icon>print</mat-icon>
          </button>
        </div>
        <button
          mat-fab
          class="ml-2"
          color="accent"
          matTooltip="Toggle Map View"
          (click)="toggleMapView.emit()"
        >
          <mat-icon>map</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .planner-main-toolbar {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
      }
    `,
  ],
})
export class EditorToolbarComponent {
  @Output() saveChanges: EventEmitter<void> = new EventEmitter<void>();
  @Output() openPrintView: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleMapView: EventEmitter<void> = new EventEmitter<void>();

  private _saveDisabled: boolean;

  get saveDisabled(): boolean {
    return this._saveDisabled;
  }
  @Input()
  set saveDisabled(value: boolean) {
    this._saveDisabled = value;
  }

  constructor() {}
}
