import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditChannelnameComponent } from './dialog-edit-channelname.component';

describe('DialogEditChannelnameComponent', () => {
  let component: DialogEditChannelnameComponent;
  let fixture: ComponentFixture<DialogEditChannelnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditChannelnameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditChannelnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
