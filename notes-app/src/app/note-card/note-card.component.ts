import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit{

  @Input() title: string;
  @Input() body: string;
  @Input() link: string;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator', {static: true}) truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText', {static: true}) bodyText: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {

  }

  ngOnInit() {
    //work out if there is a text overflow and if not, then hide the truncator

    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = (style.getPropertyValue("height"), 72);

    console.log("viewable height is: ", viewableHeight);
    if(this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      //if there is no text overflow,  show  the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
      console.log("We have text overflow", this.truncator);
    }else {
      //else (there is a text overFlow),  hide  the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
      console.log("We don't have text overflow", this.truncator);
    }
  }

  onXButtonClick() {
    this.deleteEvent.emit();
  }
}
