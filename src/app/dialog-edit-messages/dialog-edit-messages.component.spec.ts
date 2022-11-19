import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditMessagesComponent } from './dialog-edit-messages.component';

describe('DialogEditMessagesComponent', () => {
  let component: DialogEditMessagesComponent;
  let fixture: ComponentFixture<DialogEditMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
