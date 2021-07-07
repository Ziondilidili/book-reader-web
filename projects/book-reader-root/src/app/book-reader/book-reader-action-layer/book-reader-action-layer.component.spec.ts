import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReaderActionLayerComponent } from './book-reader-action-layer.component';

describe('BookReaderActionLayerComponent', () => {
  let component: BookReaderActionLayerComponent;
  let fixture: ComponentFixture<BookReaderActionLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookReaderActionLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReaderActionLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
