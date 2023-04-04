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
  filteredNotes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService, private route: Router) {}

  ngOnInit(): void {
    //we want to retrieve all notes from notes service
    this.notes = this.notesService.getAll();
    console.log("notes array: ", this.notes);

    this.filteredNotes = this.notesService.getAll();
    console.log("filteredNotes array: ", this.filteredNotes);
  }

  deleteNote(id: number) {
    this.notesService.delete(id);
    console.log("Note: ", id, "is deleted.");
  }

  filter(query: string) {
    query = query.toLowerCase().trim();

    let allResults: Note[] = new Array<Note>();

    //split up the search query intro individual words
    let words: string[] = query.split(' ');
    //remove duplicates
    words = this.removeDuplicates(words);
    //compile all relevant results into the allResults array
    words.forEach(word => {
      let results: Note[] = this.relevantNotes(word);
      //append results to the allResults array
      allResults = [...allResults, ...results];
   });
    // allResults will contain duplicate notes
    //because a particular note can be the result of many search terms
    //but we don't want to show the same note multiple times on the UI
    //so we first must remove the duplicates
    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;

    //now sort by relevancy
    this.sortByRelevancy(allResults);
  }

  removeDuplicates(arr: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>(); // we use sets because sets have unique values
    //loop throw the input array and add items to the set
    arr.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: string): Array<Note> {
    query = query.toLowerCase().trim();

    let relevantNotes = this.notes.filter(note => {
      if(note.title && note.title.toLowerCase().includes(query)){
        return true;
      }
      if(note.body && note.body.toLowerCase().includes(query)){
        return true;
      }
      return false;
    })
    return relevantNotes;
  }

  sortByRelevancy(searchResults: Note[]) {
    //this method will calculate the relevancy of a note
    //base on the number of times that note appear in the search results

    let noteCountObject: Object = {};// format key:value => NoteId: number (note object id: count)

    searchResults.forEach(note => {
      let noteId: number = this.notesService.getId(note);

      if(noteCountObject[noteId]) {
        noteCountObject[noteId] += 1;
      }else {
        noteCountObject[noteId] = 1;
      }
    })

    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
      let aId = this.notesService.getId(a);
      let bId = this.notesService.getId(b);

      let aCount = noteCountObject[aId];
      let bCount = noteCountObject[bId];

      return bCount - aCount;
    });

  }
}
