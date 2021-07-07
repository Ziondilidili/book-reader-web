import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReaderChapterListComponent } from './book-reader-chapter-list.component';

describe('BookReaderChapterListComponent', () => {
  let component: BookReaderChapterListComponent;
  let fixture: ComponentFixture<BookReaderChapterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookReaderChapterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReaderChapterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
