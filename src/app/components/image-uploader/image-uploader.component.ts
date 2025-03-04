import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  ElementRef,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'image-uploader',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss',
})
export class ImageUploaderComponent implements OnInit, OnChanges {
  @Input() width: string = '200px';
  @Input() height: string = '200px';
  @Input() initialImage: string | null = null; // New input for initial image
  @Input() editMode: boolean = false; // New input to control edit mode
  @Input() canDelete: boolean = true;

  @Output() imageSelected = new EventEmitter<File>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  currentImage: string | ArrayBuffer | null = null;
  isDragOver: boolean = false;

  ngOnInit() {
    // Set initial image if provided
    if (this.initialImage) {
      this.currentImage = this.initialImage;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Update current image if initialImage changes
    if (changes['initialImage'] && changes['initialImage'].currentValue) {
      this.currentImage = changes['initialImage'].currentValue;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.handleFile(input.files[0]);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  handleFile(file: File): void {
    this.imageSelected.emit(file);
    const reader = new FileReader();
    reader.onload = (e) => (this.currentImage = reader.result);
    reader.readAsDataURL(file);
  }

  deleteImage(): void {
    this.currentImage = null;
    this.imageSelected.emit(null as unknown as File);
    this.resetFileInput();
  }

  resetFileInput(): void {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }
}
