import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {WebformComponent} from "./webform/webform.component";
import {AuthGuard} from "./login/guard/auth.guard";
import {HomeComponent} from "./home/home.component";
import {StartComponent} from "./start/start.component";
import {DataTableComponent} from "./data-table/data-table.component";
import {ImageUploadComponent} from "./image-upload/image-upload/image-upload.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'start', component: StartComponent , canActivate: [AuthGuard]},
  { path: 'webform', component: WebformComponent ,canActivate: [AuthGuard]},
  { path: 'imageupload', component: ImageUploadComponent ,canActivate: [AuthGuard]},
  { path: 'stats', component: DataTableComponent ,canActivate: [AuthGuard]},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
export const reroutingComponents = [StartComponent,HomeComponent,WebformComponent,ImageUploadComponent, DataTableComponent]
