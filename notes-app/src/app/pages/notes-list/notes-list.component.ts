import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
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
