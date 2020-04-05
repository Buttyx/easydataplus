import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PatientReport } from '../model/patientReport.model';


@Component({
  selector: 'app-input-fields',
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.css']
})
export class InputFieldsComponent implements OnInit {

report: PatientReport = new PatientReport();
optionsKanton: string[] = ["AG","AI","AR","BE","BL","BS","FR","GE","GL","GR","JU","LU","NE","NW","OW","SG","SH","SO","SZ","TG","TI","UR","VD","VS","ZG","ZH"];
optionsGeschlecht: string[] = ["m","w","other"];

@Output()
saveReport = new EventEmitter<PatientReport>();

  constructor() { }

  ngOnInit(): void {
  }

  onReportSaved(){
  this.saveReport.emit(this.report);
  this.report = new PatientReport();
  }

}
