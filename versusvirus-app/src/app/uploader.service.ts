import {Injectable, Inject} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {Data} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as admin from 'firebase-admin';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';
import {PatientReport} from './model/patientReport.model';
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  reports: PatientReport[];
  downloadURL: Observable<string>
  images: Map<String, ImageData>;
  task: AngularFireUploadTask;

  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) {
    this.images = new Map();
  }


  public uploadImage(file: File): ImageData {


    let imageInfo: ImageData = {
      uploadPercent: undefined,
      downloadURL: undefined,
      fileRef: undefined,
      filePath: "",
    };

    imageInfo.filePath = `${Date.now()}_uploadedDocument`;
    imageInfo.fileRef = this.storage.ref(imageInfo.filePath);

    this.task = this.storage.upload(imageInfo.filePath, file);

    // observe percentage changes
    imageInfo.uploadPercent = this.task.percentageChanges();
    //get notified when the download URL is available
    this.task.snapshotChanges().pipe(
      finalize(() => {
        //imageInfo.downloadURL = imageInfo.fileRef.getDownloadURL();
        // this.images.set(imageInfo.filePath, imageInfo);
        this.saveDownloadURL(imageInfo.fileRef.getDownloadURL());
      })
    ).subscribe()

    this.images.set(imageInfo.filePath, imageInfo);


    return imageInfo;
  }

  addReport(report: PatientReport) {
    this.reports.push(report);

  }

  // manuelUploadData(data) {
  //   return new Promise<any>((resolve, reject) => {
  //     this.firestore
  //       .collection("covidCaseCollection")
  //       .add(data)
  //       .then(res => {
  //       }, err => reject(err));
  //   });
  //   ;
  // }




  saveDownloadURL(observerURL: Observable<string>) {
    this.downloadURL = observerURL;
  }
}

interface ImageData {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  fileRef: AngularFireStorageReference;
  filePath: string;
}
