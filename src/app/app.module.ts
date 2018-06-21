import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { BuildersComponent } from './builders/builders.component';

import { BuildersService } from './builders.service';

import { RouterModule, Routes } from '@angular/router';

import { HttpModule } from '@angular/http';

// 3rd Party Installs
import {NgxPaginationModule} from 'ngx-pagination';

import { MatPaginator, MatFormFieldModule, MatSelectModule, MatTableDataSource, MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeBuilderComponent } from './prime-builder/prime-builder.component';


import {DropdownModule} from 'primeng/dropdown';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';


// PrimeNG Components
import {AccordionModule} from 'primeng/accordion';  // accordion and accordion tab
import {MenuItem} from 'primeng/api'; // api
import {ButtonModule} from 'primeng/button';

import {TableModule} from 'primeng/table';
import { BuilderDetailsComponent } from './builder-details/builder-details.component';


const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'builders', component: BuildersComponent },
  { path: 'primeBuilder', component: PrimeBuilderComponent },
  { path: 'builderDetails', component: BuilderDetailsComponent },
  { path: 'builderDetails/:id', component: BuilderDetailsComponent }


];
@NgModule({
  declarations: [
    AppComponent,
    BuildersComponent,
    PrimeBuilderComponent,
    BuilderDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxPaginationModule, // 3rd Party Import
    MatSelectModule, // ngx-mat-select-search
    MatFormFieldModule, // ngx-mat-select-search
    NgxMatSelectSearchModule, // ngx-mat-select-search
    MatTableModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    AccordionModule, // PrimeNG
    TableModule, // PrimeNG
    SliderModule, // PrimeNG
    DropdownModule, // PrimeNG
    MultiSelectModule, // PrimeNG
    ButtonModule, // PrimeNG
    RouterModule.forRoot(
      appRoutes, { enableTracing: true } // <!-- Debugging
    )
  ],
  providers: [BuildersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
