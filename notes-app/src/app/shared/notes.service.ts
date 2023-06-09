import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = new Array<Note>();

  constructor() { }

  get(id: number) {
    return this.notes[id];
  }
  getId(note: Note) {
    return this.notes.indexOf(note);
  }
  getAll() {
    return this.notes;
  }
  add(note: Note) {
    //this method will add a note to the notes array and return the id of the note
    //where the id = index
    let newLength = this.notes.push(note);
    return newLength - 1;
  }
  update(id: number, title: string, body: string) {
    let note = this.notes[id];
    note.title = title;
    note.body = body;
  }
  delete(id: number) {
    this.notes.splice(id, 1);
  }
}
