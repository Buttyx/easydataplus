import { Component, OnInit } from '@angular/core';
import {AuthService} from "../login/service/auth.service";
import {EasydataService} from "../easydata.service";
import { PatientReport } from '../model/patientReport.model';
import {Router} from "@angular/router";
var data = require("../../../patientReport1.json");

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  reportAll: PatientReport[] = [data, new PatientReport(),new PatientReport(),new PatientReport()];

  displayedColumns: string[] = ['Kanton', 'Geschlecht', "Fieber", "Verstorben"];

  constructor(private router: Router, public easydata: EasydataService) { }

  ngOnInit(): void {
    // this.easydata.getData()
  }

  showPatient(row: any): void {
  this.router.navigate(["webform"]);
  console.log(row);
  }

}
