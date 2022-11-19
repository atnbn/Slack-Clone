import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestNameComponent } from './guest-name.component';

describe('GuestNameComponent', () => {
  let component: GuestNameComponent;
  let fixture: ComponentFixture<GuestNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
