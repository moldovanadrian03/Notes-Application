import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { Route, Router } from '@angular/router';
import { transition, trigger,style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      //ENTRY ANIMATION
      transition('void => *', [ //void transition to any state
        //INITIAL STATE
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,

          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,

        }),
        //we first want to animate the spacing (which includes height and margin)
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*',
        })),
        animate(100)
      ]),
      transition('* => void',[ //any state transition to void
        //first scale up
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        //then scale down to normal size while beginning to scale down
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        //scale down and fade out completely
        animate('120ms ease-out', style({
          transform: 'scale(0.65)',
          opacity: 0
        })),
        //then animate the spacing (which includes the height margin and padding )
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          'margin-bottom': 0,
          display: 'block',
        }))
      ])
    ]),
    trigger('listAnim', [
      transition('* => *', [ //any state to any state
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [ //delay between each animation
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit{

  notes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService, private route: Router) {}

  ngOnInit(): void {
    //we want to retrieve all notes from notes service
    this.notes = this.notesService.getAll();
    console.log("notes array: ", this.notes);
  }

  deleteNote(id: number) {
    this.notesService.delete(id);
    console.log("Note: ", id, "is deleted.");
  }

}
