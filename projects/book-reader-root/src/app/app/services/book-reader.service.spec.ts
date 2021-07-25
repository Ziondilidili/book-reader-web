import { TestBed } from '@angular/core/testing';

import { BookReaderService } from './book-reader.service';

describe('BookReaderService', () => {
  let service: BookReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
