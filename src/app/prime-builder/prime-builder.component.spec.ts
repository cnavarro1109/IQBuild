import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeBuilderComponent } from './prime-builder.component';

describe('PrimeBuilderComponent', () => {
  let component: PrimeBuilderComponent;
  let fixture: ComponentFixture<PrimeBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
