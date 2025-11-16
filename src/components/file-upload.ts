import { cn } from '../lib/utils';

export interface FileUploadProps {
  className?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  onFilesSelected?: (files: File[]) => void;
  onError?: (error: string) => void;
}

export class FileUpload {
  private element: HTMLDivElement;
  private input: HTMLInputElement;
  private props: FileUploadProps;
  private selectedFiles: File[] = [];

  constructor(props: FileUploadProps = {}) {
    this.props = {
      multiple: false,
      maxSize: 10 * 1024 * 1024, // 10MB default
      ...props
    };
    this.element = this.render();
    this.input = this.element.querySelector('[data-file-input]') as HTMLInputElement;
    this.setupEventListeners();
  }

  private render(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn(
      'relative rounded-lg border-2 border-dashed border-[var(--border)] bg-[var(--background)] p-8 text-center transition-colors hover:border-[var(--primary)] hover:bg-[var(--accent)]',
      this.props.className
    );
    wrapper.setAttribute('data-file-upload', '');

    const input = document.createElement('input');
    input.type = 'file';
    input.className = 'hidden';
    input.setAttribute('data-file-input', '');
    
    if (this.props.accept) {
      input.accept = this.props.accept;
    }
    if (this.props.multiple) {
      input.multiple = true;
    }
    
    wrapper.appendChild(input);

    const icon = document.createElement('div');
    icon.className = 'mx-auto mb-4 text-4xl text-[var(--muted-foreground)]';
    icon.textContent = '📁';
    wrapper.appendChild(icon);

    const title = document.createElement('div');
    title.className = 'text-sm font-medium text-[var(--foreground)]';
    title.textContent = 'Click to upload or drag and drop';
    wrapper.appendChild(title);

    const description = document.createElement('div');
    description.className = 'mt-1 text-xs text-[var(--muted-foreground)]';
    description.textContent = this.props.accept 
      ? `Accepted formats: ${this.props.accept}` 
      : 'Any file type';
    wrapper.appendChild(description);

    const fileList = document.createElement('div');
    fileList.className = 'mt-4 space-y-2';
    fileList.setAttribute('data-file-list', '');
    wrapper.appendChild(fileList);

    return wrapper;
  }

  private setupEventListeners(): void {
    // Click to select files
    this.element.addEventListener('click', () => {
      this.input.click();
    });

    this.input.addEventListener('change', (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      this.handleFiles(files);
    });

    // Drag and drop
    this.element.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.element.classList.add('border-[var(--primary)]', 'bg-[var(--accent)]');
    });

    this.element.addEventListener('dragleave', () => {
      this.element.classList.remove('border-[var(--primary)]', 'bg-[var(--accent)]');
    });

    this.element.addEventListener('drop', (e) => {
      e.preventDefault();
      this.element.classList.remove('border-[var(--primary)]', 'bg-[var(--accent)]');
      
      const files = Array.from(e.dataTransfer?.files || []);
      this.handleFiles(files);
    });
  }

  private handleFiles(files: File[]): void {
    const validFiles: File[] = [];
    
    for (const file of files) {
      // Validate file size
      if (this.props.maxSize && file.size > this.props.maxSize) {
        if (this.props.onError) {
          this.props.onError(`File "${file.name}" exceeds maximum size of ${this.formatFileSize(this.props.maxSize)}`);
        }
        continue;
      }

      validFiles.push(file);
    }

    if (!this.props.multiple && validFiles.length > 0) {
      this.selectedFiles = [validFiles[0]];
    } else {
      this.selectedFiles = [...this.selectedFiles, ...validFiles];
    }

    this.updateFileList();

    if (this.props.onFilesSelected && validFiles.length > 0) {
      this.props.onFilesSelected(validFiles);
    }
  }

  private updateFileList(): void {
    const fileList = this.element.querySelector('[data-file-list]') as HTMLDivElement;
    fileList.innerHTML = '';

    this.selectedFiles.forEach((file, index) => {
      const fileItem = document.createElement('div');
      fileItem.className = 'flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm';

      const fileInfo = document.createElement('div');
      fileInfo.className = 'flex items-center gap-2';

      const fileName = document.createElement('span');
      fileName.className = 'font-medium text-[var(--card-foreground)]';
      fileName.textContent = file.name;
      fileInfo.appendChild(fileName);

      const fileSize = document.createElement('span');
      fileSize.className = 'text-[var(--muted-foreground)]';
      fileSize.textContent = this.formatFileSize(file.size);
      fileInfo.appendChild(fileSize);

      fileItem.appendChild(fileInfo);

      const removeButton = document.createElement('button');
      removeButton.className = 'text-[var(--muted-foreground)] hover:text-[var(--destructive)]';
      removeButton.textContent = '✕';
      removeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeFile(index);
      });
      fileItem.appendChild(removeButton);

      fileList.appendChild(fileItem);
    });
  }

  private removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.updateFileList();
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  getFiles(): File[] {
    return this.selectedFiles;
  }

  clear(): void {
    this.selectedFiles = [];
    this.input.value = '';
    this.updateFileList();
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createFileUpload(props: FileUploadProps = {}): FileUpload {
  return new FileUpload(props);
}
