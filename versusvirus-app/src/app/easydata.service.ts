import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PatientReport} from "./model/patientReport.model";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable()
export class EasydataService {
  private _url: string = 'https://us-central1-versusvirus-273113.cloudfunctions.net/webApi/';

  constructor(private https: HttpClient) {
  }


  manualUpload(data: PatientReport):boolean {
    let header = new HttpHeaders();

    header.append('Authorization', 'Bearer ' + localStorage.getItem('idToken'));
    // try {
      this.https.post('https://us-central1-versusvirus-273113.cloudfunctions.net/webApi/case', data, {headers: header});
      return true;
    //   )
    //   console.log("Created: " + data.patient.ahvnr)
    //   return true;
    //
    // } catch (e) {
    //   console.log("failed to create: " + data.patient.ahvnr)
    //   return false;
    // }
  // }
}

}
