import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'book-reader-text-indent-selector',
  templateUrl: './text-indent-selector.component.html',
  styleUrls: ['./text-indent-selector.component.css']
})
export class TextIndentSelectorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public currentTextIndentEM:number,
  ) { }

  ngOnInit(): void {
  }
}
