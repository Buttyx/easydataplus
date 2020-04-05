import { Component, OnInit, Input } from '@angular/core';
import { UploaderService } from 'src/app/uploader.service';
import { environment } from '../../../environments/environment'
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from "firebase"
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { PatientReport } from 'src/app/model/patientReport.model';
import { AuthService } from 'src/app/login/service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  showProgress = false;
  showFileChooser = true;
  selectedFile : File;
  imageInfo: ImageData;
  errorMessage = "";
  uploadProgress = 100;
  loadedFiles: string[] = [];
  constructor(private upService: UploaderService, private fireStorage: AngularFireStorage, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    // firebase.initializeApp(environment.firebaseConfig);
  }

  // triggered when a file is choosen
  onFileChanged(event){
    // console.log(event);
    this.selectedFile = <File>event.target.files[0];
    this.onUpload();
  }

  // triggered when upload button is clicked
  onUpload(){
      this.toggleUploadElements();
      this.errorMessage = "";
      var imageInfo = this.upService.uploadImage(this.selectedFile);
      this.upService.task.then((snapshot: UploadTaskSnapshot) => {
        console.log("Uploaded");
        this.loadedFiles.splice(0, 0, this.selectedFile.name);
        this.toggleUploadElements();
      } , (error: Error) => {
        this.toggleUploadElements();
        console.log(error);
        this.errorMessage = "Upload fehlgeschlagen: Haben Sie sich schon eingeloggt?";

      });

      // Observe progress of upload
      imageInfo.uploadPercent.subscribe((uploadPercent: number) => {
        this.uploadProgress= uploadPercent;
      });
    }


    toggleUploadElements(){
      this.showFileChooser = !this.showFileChooser;
      this.showProgress = !this.showProgress;
    }
    editImage(index: number){
      this.loadedFiles[index];
    }

    onImageParsed(report: PatientReport){
      this.upService.addReport(report);
    }

    redirect(path:string) {
      if(this.authService.isLoggedIn()) {
        this.router.navigate([path]);
      }
      else {
        this.router.navigate(['home'])
      }
    }

    
}
