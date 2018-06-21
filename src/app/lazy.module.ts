import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LazyParentComponent } from './lazy-parent/lazy-parent.component';


const routes: Routes = [
  { path: 'load-me', component: LazyParentComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LazyParentComponent
  ]
})
export class LazyModule { }
