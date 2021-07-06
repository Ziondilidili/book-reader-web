import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxtBookUploaderComponent } from './txt-book-uploader.component';

describe('TxtBookUploaderComponent', () => {
  let component: TxtBookUploaderComponent;
  let fixture: ComponentFixture<TxtBookUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TxtBookUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TxtBookUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
