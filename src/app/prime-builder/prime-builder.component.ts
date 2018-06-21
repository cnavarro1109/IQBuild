import { Component, OnInit } from '@angular/core';
import { BuildersService } from '../builders.service';

// PrimeNG
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

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


  constructor(private service: BuildersService) { }

  ngOnInit() {

     // query
     this.service.loadAll(); // Load all the data

     /* Subscribe to the service, this is
     required in order to properly wait for a response
     */
     this.service.todos.subscribe(response => {
       this.cars = response;
     });

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
          { field: 'color', header: 'Color' }
      ];

  }

//   onYearChange(event, dt) {
//     console.log(' Year changed.. ', dt);
//     if (this.yearTimeout) {
//         clearTimeout(this.yearTimeout);
//     }

//     this.yearTimeout = setTimeout(() => {
//         this.cars = dt.filter(event.value, 'year', 'gt');
//     }, 250);
// }



}

export interface Car {
  vin;
  year;
  brand;
  color;
}
