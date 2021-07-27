import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'book-reader-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent implements OnInit {
  @ViewChild("newColor")
  private newColor!:ElementRef<Input>
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public color:string,
  ) { }

  ngOnInit(): void {
  }
}
