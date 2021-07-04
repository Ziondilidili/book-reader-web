import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListRootComponent } from './book-list-root.component';

describe('BookListRootComponent', () => {
  let component: BookListRootComponent;
  let fixture: ComponentFixture<BookListRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
