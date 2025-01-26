import { Component, EventEmitter, Input, Output } from '@angular/core'
import { defaultFileValidation, FileValidation, validateFile } from '~/app/utils/file.utils'
import { environment } from '~/environments/environment'
import { FileService } from '~/app/services/core/file.service'

@Component({
  selector: 'tp-trip-image-uploader',
  template: `
    <label>{{ 'myTrips.editTripDialog.coverImage' | translate }}</label>
    <main>
      <div class="image-box">
        <div *ngIf="imageUrl" class="image-preview">
          <img [src]="imageUrl" alt="image" />
        </div>
        <div
          *ngIf="!imageUrl"
          class="image-dropzone"
          [class.image-dropzone_invalid]="!validation.valid"
          [class.image-dropzone_dragging]="isDragging"
          (drop)="onDrop($event)"
          (dragover)="onDragOver($event)"
          (dragenter)="onDragEnter($event)"
          (dragleave)="onDragLeave($event)"
        >
          <button mat-icon-button (click)="onAdd($event)">
            <mat-icon>add_photo_alternate</mat-icon>
          </button>
          <small>{{ 'imageUploader.dragOrClick' | translate }}</small>
        </div>
      </div>
      <div class="image-actions">
        <button *ngIf="imageUrl" mat-button color="warn" (click)="onRemove($event)">
          <mat-icon matPrefix>delete</mat-icon>
          {{ 'imageUploader.remove' | translate | uppercase }}
        </button>
        <button *ngIf="imageUrl" mat-button color="primary" (click)="onChange($event)">
          <mat-icon>edit</mat-icon>
          {{ 'imageUploader.change' | translate | uppercase }}
        </button>
        <button *ngIf="!imageUrl" mat-button color="primary" (click)="onAdd($event)">
          <mat-icon>add</mat-icon>
          {{ 'imageUploader.upload' | translate | uppercase }}
        </button>
      </div>
    </main>
    <mat-error *ngIf="validation.errors.imageSize">
      {{
        'imageUploader.invalidDimensions'
          | translate: { minWidth: rules.minImageWidth, minHeight: rules.minImageHeight }
      }}
    </mat-error>
    <mat-error *ngIf="validation.errors.fileType">
      {{ 'imageUploader.invalidType' | translate }}
    </mat-error>
    <mat-error *ngIf="validation.errors.fileSize">
      {{ 'imageUploader.invalidSize' | translate: { maxSize: rules.maxFileSize } }}
    </mat-error>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-bottom: 1rem;
      }
      main {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .image-actions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
      @media (min-width: 500px) {
        main {
          flex-direction: row;
        }
        .image-actions {
          flex-direction: column;
        }
      }
      label {
        display: block;
        color: var(--color-text-light);
        font-size: 75%;
        margin-bottom: 8px;
      }
      .image-preview,
      .image-dropzone {
        width: 190px;
        height: 108px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text-lightest);
        border: 1px solid var(--color-text-lightest);
        border-radius: 4px;
        margin-bottom: 0.5rem;
        overflow: hidden;
      }
      .image-dropzone {
        border: 1px dashed var(--color-text-lightest);
        flex-direction: column;
        padding: 4px;
      }
      .image-dropzone small {
        display: block;
        font-size: 75%;
        text-align: center;
      }
      .image-dropzone_invalid {
        border: 1px dashed var(--color-warn);
      }
      .image-dropzone_dragging {
        border: 1px dashed var(--color-accent);
        background-color: var(--color-text-lightest);
        color: white;
      }
      .image-preview img {
        width: 100%;
      }
      mat-error {
        font-size: 75%;
      }
    `
  ]
})
export class TripImageUploaderComponent {
  public rules = environment.coverImageRules
  public isDragging = false
  public validation: FileValidation = defaultFileValidation

  @Input() public imageUrl: string

  @Output() public imageChange: EventEmitter<string> = new EventEmitter<string>()

  constructor(private fileService: FileService) {}

  public async onDrop(e: DragEvent): Promise<void> {
    e.preventDefault()
    if (e.dataTransfer && e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0]
      await this.handleFile(file)
    }
    this.isDragging = false
  }

  public async onAdd(e: Event): Promise<void> {
    e.preventDefault()
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.click()
    input.addEventListener('change', async () => {
      if (input.files) {
        this.validation = defaultFileValidation
        const file = input.files[0]
        await this.handleFile(file)
      }
    })
  }

  public async onChange(e: Event): Promise<void> {
    e.preventDefault()
    await this.onRemove(e)
    await this.onAdd(e)
  }

  public async onRemove(e: Event): Promise<void> {
    e.preventDefault()
    const deleted = await this.fileService.deleteFile(this.imageUrl)
    if (!deleted) return
    this.imageUrl = null
    this.imageChange.emit(null)
  }

  public onDragOver(e: DragEvent): void {
    e.preventDefault()
    this.isDragging = true
  }

  public onDragEnter(e: DragEvent): void {
    e.preventDefault()
    this.isDragging = true
    this.validation = defaultFileValidation
  }

  public onDragLeave(e: DragEvent): void {
    e.preventDefault()
    this.isDragging = false
  }

  private async handleFile(file: File): Promise<void> {
    const validation = await validateFile(file, this.rules)
    if (validation.valid) {
      const url = await this.fileService.uploadTripCoverImage(file)
      this.imageUrl = url
      this.imageChange.emit(url)
    } else {
      this.validation = validation
    }
  }
}
