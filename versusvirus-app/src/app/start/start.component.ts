import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../login/service/auth.service";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.redirect('start')
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
