import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDmComponent } from './dialog-add-dm.component';

describe('DialogAddDmComponent', () => {
  let component: DialogAddDmComponent;
  let fixture: ComponentFixture<DialogAddDmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddDmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddDmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
