import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule, reroutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageUploadComponent } from './image-upload/image-upload/image-upload.component';
import { LoginComponent } from './login/login.component';
import { WebformComponent } from './webform/webform.component';
import { InputFieldsComponent } from './input-fields/input-fields.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFirestore } from '@angular/fire/firestore';
import { MaterialModule } from './material.module';
import { UploaderService } from './uploader.service';
import {AuthService} from "./login/service/auth.service";
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthGuard} from "./login/guard/auth.guard";
import { HomeComponent } from './home/home.component';
import { StartComponent } from './start/start.component';

import { HttpClientModule } from '@angular/common/http';
import { DataTableComponent } from './data-table/data-table.component';
import {EasydataService} from "./easydata.service";

@NgModule({
  declarations: [
    AppComponent,
    reroutingComponents,
    ImageUploadComponent,
    LoginComponent,
    WebformComponent,
    InputFieldsComponent,
    StartComponent,
    HomeComponent,
    DataTableComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    UploaderService,
    AuthService,
    EasydataService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private firestore: AngularFirestore) {

  }
}
