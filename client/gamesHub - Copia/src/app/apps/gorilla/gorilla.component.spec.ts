import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GorillaAppComponent } from './gorilla.component';

describe('GorillaAppComponent', () => {
  let component: GorillaAppComponent;
  let fixture: ComponentFixture<GorillaAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GorillaAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GorillaAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
