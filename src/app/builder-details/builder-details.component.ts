import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NUMBER_FORMAT_REGEXP } from '@angular/common/src/i18n/format_number';

@Component({
  selector: 'app-builder-details',
  templateUrl: './builder-details.component.html',
  styleUrls: ['./builder-details.component.css']
})
export class BuilderDetailsComponent implements OnInit {
  private subscriptions = new Subscription();
  private id: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.subscriptions.add(
      this.activatedRoute.params.subscribe(
        async(params) => {
          const paramId = Number(params['id']) || 0;
          console.log('Parameter ID: ', paramId);
        }
      )
    );

  }

}
