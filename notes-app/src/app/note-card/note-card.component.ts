import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit{
  @ViewChild('truncator', {static: true}) truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText', {static: true}) bodyText: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {

  }

  ngOnInit() {
    //work out if there is a text overflow and if not, then hide the truncator

    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = (style.getPropertyValue("height"), 72);

    if(this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      //if there is no text overflow,  show  the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    }else {
      //else (there is a text overFlow),  hide  the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }
}
