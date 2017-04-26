import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes),
    CommonModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
