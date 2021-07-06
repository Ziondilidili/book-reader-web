import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReaderMainComponent } from './book-reader-main.component';

describe('BookReaderMainComponent', () => {
  let component: BookReaderMainComponent;
  let fixture: ComponentFixture<BookReaderMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookReaderMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReaderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
