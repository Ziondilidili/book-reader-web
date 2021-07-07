import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReaderStyleComponent } from './book-reader-style.component';

describe('BookReaderStyleComponent', () => {
  let component: BookReaderStyleComponent;
  let fixture: ComponentFixture<BookReaderStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookReaderStyleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReaderStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
