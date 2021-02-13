import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MapService } from '~/app/services/maps/map.service';

@Component({
  selector: 'tp-planner',
  template: `
    <div class="planner">
      <tp-editor
        #editor
        [class.editor_hidden]="mapView"
        [tripId]="tripId"
        (toggleMapView)="onToggleMapView()"
        (openPrintView)="onOpenPrintView()"
        (newTripCreated)="onNewTripCreated($event)"
      ></tp-editor>

      <tp-map [mapView]="mapView" (toggleMapView)="onToggleMapView()"></tp-map>

      <div #resizer *ngIf="!mapView" class="resizer" (mousedown)="onResizerMouseDown()"></div>
    </div>
  `,
  styles: [
    `
      .planner {
        width: calc(100vw - 60px);
        height: 100vh;
        display: flex;
        position: relative;
      }

      .planner tp-editor {
        width: 500px;
        min-width: 350px;
        max-width: 650px;
      }

      .planner .editor_hidden {
        display: none;
      }

      .planner tp-map {
        flex-grow: 1;
      }

      .planner .resizer {
        position: absolute;
        top: 0;
        width: 12px;
        height: 100%;
      }

      .planner .resizer:before {
        content: '';
        position: absolute;
        top: 0;
        left: 3px;
        width: 6px;
        height: 100%;
        background-color: var(--color-teal);
        opacity: 0;
      }

      .planner .resizer:hover {
        cursor: col-resize;
      }

      .planner .resizer:hover::before {
        opacity: 1;
      }
    `,
  ],
})
export class PlannerComponent implements OnInit, AfterViewInit {
  @ViewChild('editor', { read: ElementRef }) editorRef: ElementRef;
  @ViewChild('resizer') resizerRef: ElementRef;
  private editor: HTMLElement;
  private resizer: HTMLDivElement;
  public mapView = false;
  public tripId: string;

  private dragging = false;

  constructor(
    private mapService: MapService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tripId = params.id;
    });
  }

  ngAfterViewInit() {
    this.initResizer();
  }

  initResizer(): void {
    this.editor = this.editorRef.nativeElement;
    this.resizer = this.resizerRef.nativeElement;
    this.resizer.style.left = this.editor.offsetWidth - 6 + 'px';
  }

  onResizerMouseDown(): void {
    this.dragging = true;
    window.addEventListener('mousemove', this.onResizerMouseMove.bind(this));
    window.addEventListener('mouseleave', this.onResizerMouseUp.bind(this));
    window.addEventListener('mouseup', this.onResizerMouseUp.bind(this));
  }

  onResizerMouseMove(event: MouseEvent): void {
    if (this.dragging) {
      this.editor.style.width = event.pageX - 60 + 'px';
      this.resizer.style.left = this.editor.offsetWidth - 6 + 'px';
    }
  }

  onResizerMouseUp(): void {
    this.dragging = false;
    window.removeEventListener('mousemove', this.onResizerMouseMove.bind(this));
    window.removeEventListener('mouseleave', this.onResizerMouseUp.bind(this));
    window.removeEventListener('mouseup', this.onResizerMouseUp.bind(this));
  }

  onToggleMapView(): void {
    this.mapView = !this.mapView;
    this.mapService.handleResize();
    if (!this.mapView) {
      requestAnimationFrame(() => this.initResizer());
    }
  }

  onOpenPrintView(): void {
    // todo: planner.openPrintView
  }

  onNewTripCreated(id: string): void {
    this.router.navigate([`/planner/${id}`]);
  }
}
