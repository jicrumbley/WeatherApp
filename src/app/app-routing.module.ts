import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZipcodeComponent } from './zipcode/zipcode.component';
import { NameComponent } from './name/name.component';
import { IdComponent } from './id/id.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'zip',
    component: ZipcodeComponent
  },
  {
    path:'name',
    component: NameComponent
  },
  {
    path:'id',
    component:IdComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
