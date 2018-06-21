import { Component, OnInit, Input } from '@angular/core';
import { BuildersService } from '../builders.service';

// PrimeNG
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ButtonModule} from 'primeng/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-builders',
  templateUrl: './prime-builder.component.html',
  styleUrls: ['./prime-builder.component.css']
})
export class PrimeBuilderComponent implements OnInit {
  cars: Car[];

  cols: any[];

  brands: any[];

  colors: any[];

  years: any[];

  yearFilter: number;

  yearTimeout: any;

  loading: boolean;

  @Input()
  selectedRowId: number;


  constructor(private service: BuildersService, private router: Router) { }

  ngOnInit() {
    this.loading = true;

     // query
     this.service.loadAll(); // Load all the data

     /* Subscribe to the service, this is
     required in order to properly wait for a response
     */

    // Setting timeout to test loader icon
    setTimeout(() => {
      this.service.todos.subscribe(response => {
       this.cars = response;
       this.loading = false;
     });
    }, 1000);

     // Static Data
     this.brands = [
      { label: 'All Brands', value: null },
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' },
      { label: 'Honda', value: 'Honda' },
      { label: 'Jaguar', value: 'Jaguar' },
      { label: 'Mercedes', value: 'Mercedes' },
      { label: 'Renault', value: 'Renault' },
      { label: 'VW', value: 'VW' },
      { label: 'Volvo', value: 'Volvo' }
      ];

      this.colors = [
          { label: 'White', value: 'White' },
          { label: 'Green', value: 'Green' },
          { label: 'Silver', value: 'Silver' },
          { label: 'Black', value: 'Black' },
          { label: 'Red', value: 'Red' },
          { label: 'Maroon', value: 'Maroon' },
          { label: 'Brown', value: 'Brown' },
          { label: 'Orange', value: 'Orange' },
          { label: 'Blue', value: 'Blue' }
      ];


      this.years = [
        { label: 'All Years', value: null },
        { label: '2016', value: '2016' },
        { label: '2017', value: '2017' },
        { label: '2018', value: '2018' }
    ];

      this.cols = [
          { field: 'vin', header: 'Vin' },
          { field: 'year', header: 'Year' },
          { field: 'brand', header: 'Brand' },
          { field: 'color', header: 'Color' },
          { field: 'id', header: 'Edit' }
      ];

  }


  handleClick(value: any) {
    this.router.navigateByUrl('/builderDetails/' + value);
    console.log(value);
  }



}

export interface Car {
  vin;
  year;
  brand;
  color;
}
