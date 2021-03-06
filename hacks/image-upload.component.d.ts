import { EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Headers } from '@angular/http';
import { ImageService } from './image.service';
import { Style } from "./style";
import { UploadMetadata } from './before-upload.interface';
export declare class FileHolder {
    src: string;
    file: File;
    pending: boolean;
    serverResponse: {
        status: number;
        response: any;
        _body : any;
    };
    constructor(src: string, file: File);
}
export declare class ImageUploadComponent implements OnInit, OnChanges {
    private imageService;
    files: FileHolder[];
    fileCounter: number;
    fileOver: boolean;
    showFileTooLargeMessage: boolean;
    beforeUpload: (UploadMetadata) => UploadMetadata | Promise<UploadMetadata>;
    buttonCaption: string;
    cssClass: string;
    clearButtonCaption: string;
    dropBoxMessage: string;
    fileTooLargeMessage: string;
    headers: Headers | {
        [name: string]: any;
    };
    max: number;
    maxFileSize: number;
    preview: boolean;
    partName: string;
    style: Style;
    supportedExtensions: string[];
    url: string;
    withCredentials: boolean;
    uploadedFiles: string[] | Array<{
        url: string;
        fileName: string;
        blob?: Blob;
    }>;
    removed: EventEmitter<FileHolder>;
    uploadStateChanged: EventEmitter<boolean>;
    uploadFinished: EventEmitter<FileHolder>;
    private inputElement;
    private pendingFilesCounter;
    constructor(imageService: ImageService);
    ngOnInit(): void;
    deleteAll(): void;
    deleteFile(file: FileHolder): void;
    ngOnChanges(changes: any): void;
    onFileChange(files: FileList): void;
    onFileOver: (isOver: any) => any;
    private countRemainingSlots;
    private onResponse(response, fileHolder);
    private processUploadedFiles();
    private uploadFiles(files, filesToUploadNum);
    private uploadSingleFile(fileHolder, url?, customForm?);
}
