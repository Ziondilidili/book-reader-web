import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextIndentSelectorComponent } from './text-indent-selector.component';

describe('TextIndentSelectorComponent', () => {
  let component: TextIndentSelectorComponent;
  let fixture: ComponentFixture<TextIndentSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextIndentSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextIndentSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
