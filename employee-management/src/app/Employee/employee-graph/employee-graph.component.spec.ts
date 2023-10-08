import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGraphComponent } from './employee-graph.component';

describe('EmployeeGraphComponent', () => {
  let component: EmployeeGraphComponent;
  let fixture: ComponentFixture<EmployeeGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
