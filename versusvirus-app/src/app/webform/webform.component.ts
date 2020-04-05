import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PatientReport} from '../model/patientReport.model';
import {EasydataService} from "../easydata.service";

@Component({
  selector: 'app-webform',
  templateUrl: './webform.component.html',
  styleUrls: ['./webform.component.css']
})
export class WebformComponent implements OnInit {

  constructor(public snackBar: MatSnackBar, private easyData: EasydataService) {
  }

  ngOnInit(): void {
  }

  onReportSaved(report: PatientReport) {
    const responds = this.easyData.manualUpload(report);
    let snackText = (responds) ? 'Report saved!' : 'Error occurred!'
    this.snackBar.open(snackText, '', {verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 3000
    });


  }

}
