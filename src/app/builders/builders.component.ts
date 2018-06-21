import { Component, OnInit, OnDestroy } from '@angular/core';
import { BuildersService } from '../builders.service';
import { FormControl } from '@angular/forms';

import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Builder {
  id: string;
  name: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

export class TableBasicExample {
  displayedColumns = ['position'];
}

@Component({
  selector: 'app-builders',
  templateUrl: './builders.component.html',
  styleUrls: ['./builders.component.css']
})
export class BuildersComponent implements OnInit, OnDestroy {
  p = 1;
  listBuilders: any;
  todos: any;
  displayedColumns: any;
  dataSource = ELEMENT_DATA;

  /* START: CONTOLS */
  public builderCtrl: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();
  public bankMultiCtrl: FormControl = new FormControl();
  public bankMultiFilterCtrl: FormControl = new FormControl();
  public filteredBanks: ReplaySubject<Builder[]> = new ReplaySubject<Builder[]>(1);
  public filteredBanksMulti: ReplaySubject<Builder[]> = new ReplaySubject<Builder[]>(1);

  /** list */
   private builders: Builder[] = [
     {name: 'Builder A', id: 'A'},
     {name: 'Builde B', id: 'B'}
   ];

  /* END: CONTROLS */

  private _onDestroy = new Subject<void>();

  constructor(private service: BuildersService) {
  }

  ngOnInit() {
    // set the initial selection
    this.builderCtrl.setValue(this.builders[10]);
    this.bankMultiCtrl.setValue([this.builders[10], this.builders[11], this.builders[12]]);

     // load the initial bank list
     this.filteredBanks.next(this.builders.slice());
     this.filteredBanksMulti.next(this.builders.slice());

     // listen for search field value changes
     this.bankFilterCtrl.valueChanges
       .pipe(takeUntil(this._onDestroy))
       .subscribe(() => {
         this.filterBanks();
       });
     this.bankMultiFilterCtrl.valueChanges
       .pipe(takeUntil(this._onDestroy))
       .subscribe(() => {
         this.filterBanksMulti();
       });

    // query
    this.service.loadAll(); // Load all the data


    /* Subscribe to the service, this is
    required in order to properly wait for a response
    */
    this.service.todos.subscribe(response => {
      this.listBuilders = response;

      response.forEach(element => {
        console.log(element.id);
      });
    });


  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private filterBanks() {
    if (!this.builders) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.builders.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.builders.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }


  private filterBanksMulti() {
    if (!this.builders) {
      return;
    }
    // get the search keyword
    let search = this.bankMultiFilterCtrl.value;
    if (!search) {
      this.filteredBanksMulti.next(this.builders.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanksMulti.next(
      this.builders.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }
}
