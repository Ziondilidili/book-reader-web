import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReaderContentLayerComponent } from './book-reader-content-layer.component';

describe('BookReaderContentLayerComponent', () => {
  let component: BookReaderContentLayerComponent;
  let fixture: ComponentFixture<BookReaderContentLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookReaderContentLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReaderContentLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
