import { Component, OnInit } from '@angular/core'
import { FileService } from '~/app/services/core/file.service'

@Component({
  selector: 'tp-file-debug',
  template: `
    <div class="debug">
      <input type="file" (change)="uploadFile($event)" />
      <p>url: {{ downloadUrl }}</p>

      <input type="text" [(ngModel)]="deleteUrl" />
      <button (click)="deleteFile()">delete</button>
    </div>
  `,
  styles: [
    `
      .debug {
        padding: 2rem;
      }
    `
  ]
})
export class FileDebugComponent implements OnInit {
  public downloadUrl = ''
  public deleteUrl = ''

  constructor(private fileService: FileService) {}

  ngOnInit(): void {}

  public async uploadFile(event: Event): Promise<void> {
    const url = await this.fileService.uploadTripCoverImage(
      (event.target as HTMLInputElement).files[0]
    )
    console.log('uploaded:', url)
    this.downloadUrl = url
  }

  public async deleteFile(): Promise<void> {
    const deleted = await this.fileService.deleteFile(this.deleteUrl)
    console.log('deleted:', deleted)
  }
}
