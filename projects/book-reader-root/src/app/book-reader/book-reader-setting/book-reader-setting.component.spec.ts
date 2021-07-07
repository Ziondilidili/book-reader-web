import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReaderSettingComponent } from './book-reader-setting.component';

describe('BookReaderSettingComponent', () => {
  let component: BookReaderSettingComponent;
  let fixture: ComponentFixture<BookReaderSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookReaderSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReaderSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
