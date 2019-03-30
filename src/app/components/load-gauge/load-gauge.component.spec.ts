import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadGaugeComponent } from './load-gauge.component';

describe('LoadGaugeComponent', () => {
  let component: LoadGaugeComponent;
  let fixture: ComponentFixture<LoadGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
