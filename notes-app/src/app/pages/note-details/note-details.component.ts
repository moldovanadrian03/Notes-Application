import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit{
  note: Note;
  noteId: number;
  new: boolean;

  constructor(private notesService: NotesService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.note = new Note();

      //we want to find out if we are creating a new note or editing an existing one
      this.route.params.subscribe((params: Params) => {
        if(params['id']) {
          this.note = this.notesService.get(params['id']);
          this.noteId = params['id'];
          this.new = false;
        } else {
          this.new = true;
        }
        console.log("note id is: ", this.noteId);
        console.log("note new: ", this.new);
      })
  }
  onSubmit(form: NgForm) {
    console.log(form);

    if(this.new) {
      //we should save the note and go back to the notes-list-component
      this.notesService.add(form.value);
      this.router.navigateByUrl('/');
    } else {
      //we update the note
      this.notesService.update(this.noteId, form.value.title, form.value.body);
    }
  }
  cancel() {
    //this function route the cancel button to the notes-list-component
    this.router.navigateByUrl('/');
  }
}
