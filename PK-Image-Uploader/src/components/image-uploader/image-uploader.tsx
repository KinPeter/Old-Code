import { Component, h, Prop, Host, State, Event, EventEmitter, Watch } from '@stencil/core';
import { imageUploaderWording } from './image-uploader.wording';
import { PictureIcon } from './picture-icon';

@Component({
  tag: 'pk-image-uploader',
  styleUrl: 'image-uploader.scss',
  shadow: true
})
export class ImageUploader {

  @Prop() image: string;
  @Prop() label: string;
  @Prop({ attribute: 'width-min' }) minImageWidth: number = 320;
  @Prop({ attribute: 'height-min' }) minImageHeight: number = 240;
  @Prop({ attribute: 'width-max' }) maxImageWidth: number = 6000;
  @Prop({ attribute: 'height-max' }) maxImageHeight: number = 4000;
  @Prop({ attribute: 'size-max' }) maxFileSize: number = 5;

  @State() imageSrc: string;
  @State() selectedFile: File | null;
  @State() isInvalid: boolean = false;
  @State() errorMessage: string = '';
  @State() isDragging: boolean = false;

  @Event() imagechange: EventEmitter<File | null>;

  wording = imageUploaderWording;

  componentWillLoad() {
    this.imageSrc = this.image;
  }

  @Watch('selectedFile')
  onSelectedFileChange(newValue: File | null) {
    if (!this.isInvalid) {
      this.imageSrc = newValue ? URL.createObjectURL(newValue) : null;
      this.imagechange.emit(newValue);
    }
  }

  onRemove() {
    this.imageSrc = null;
    this.selectedFile = null;
  }

  onBrowse() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();
    input.addEventListener('change', async () => {
      if (input.files && await this.validateFile(input.files[0]) ) {
        this.selectedFile = input.files[0];
      }
    });
  }

  async onDrop(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0]
      if (await this.validateFile(file)) {
        this.selectedFile = file
      } else {
        this.selectedFile = null
      }
    }
    this.isDragging = false;
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
    this.isDragging = true;
  }

  onDragEnter(e: DragEvent) {
    e.preventDefault();
    this.resetErrorState();
    this.isDragging = true;
    this.imageSrc = null;
  }

  onDragLeave(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;
  }

  async validateFile(file: File): Promise<boolean> {
    this.resetErrorState();
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      this.isInvalid = true;
      this.errorMessage = this.wording.typeError;
      return false;
    }

    if (file.size > this.maxFileSize * 1024 * 1024) {
      this.isInvalid = true;
      this.errorMessage = this.wording.sizeError(this.maxFileSize);
      return false;
    }

    const image = await this.loadFileToImage(file);

    if (this.minImageHeight != 0 && this.minImageWidth != 0 &&
      (image.width < this.minImageWidth || image.height < this.minImageHeight)
    ) {
      this.isInvalid = true;
      this.errorMessage = this.wording.smallError(this.minImageWidth, this.minImageHeight);
      return false;
    }

    if (this.maxImageWidth != 0 && this.maxImageHeight != 0 &&
      (image.width > this.maxImageWidth || image.height > this.maxImageHeight)
    ) {
      this.isInvalid = true;
      this.errorMessage = this.wording.bigError(this.maxImageWidth, this.maxImageHeight);
      return false;
    }

    return true
  }

  loadFileToImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.onerror = () => {
        reject(new Error());
      };
      image.src = URL.createObjectURL(file);
    })
  }

  resetErrorState(): void {
    this.errorMessage = '';
    this.isInvalid = false;
  }

  render() {
    return (
      <Host>
        <div
          class="wrapper"
          onDrop={(e) => this.onDrop(e)}
          onDragOver={(e) => this.onDragOver(e)}
          onDragEnter={(e) => this.onDragEnter(e)}
          onDragLeave={(e) => this.onDragLeave(e)}
        >
          <label class={{ 'error': this.isInvalid }}>{this.label}</label>

          {this.imageSrc
            ? <div
                class="box image-box"
                style={{ backgroundImage: `url(${this.imageSrc})` }}
              >
                <button onClick={() => this.onRemove()}>{ this.wording.removeButton }</button>
              </div>

            : <div class={{
                  'box': true,
                  'drop-box': true,
                  'dragging': this.isDragging,
                  'error': this.isInvalid
                }}
              >
                <div class="drop-box-content">
                  <PictureIcon opacity={0.6} width={40}/>
                  <p>{ this.wording.boxText }</p>
                  <button onClick={() => this.onBrowse()}>{ this.wording.browseButton }</button>
                  <small class="hint">
                    { this.wording.hint(this.minImageWidth, this.minImageHeight, this.maxImageWidth, this.maxImageHeight, this.maxFileSize) }
                  </small>
                  {this.isInvalid && this.errorMessage
                    ? <small class="error-message">
                        { this.errorMessage }
                      </small>
                    : null
                  }
                </div>
              </div>
          }
        </div>
      </Host>
    );
  }

}
