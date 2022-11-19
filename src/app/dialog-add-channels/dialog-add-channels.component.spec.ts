import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddChannelsComponent } from './dialog-add-channels.component';

describe('DialogAddChannelsComponent', () => {
  let component: DialogAddChannelsComponent;
  let fixture: ComponentFixture<DialogAddChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddChannelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
