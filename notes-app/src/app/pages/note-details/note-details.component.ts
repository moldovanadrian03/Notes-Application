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

      //we want to find out if we are creating a new note or editing an existing one
      this.route.params.subscribe((params: Params) => {
        this.note = new Note();

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
    if(this.new) {

      //we should save the note and go back to the notes-list-component
      this.notesService.add(form.value);
      console.log("Note: ",this.noteId,  "was created.");
    } else {

      //we update the note and go back to the notes-list-component
      this.notesService.update(this.noteId, form.value.title, form.value.body);
      console.log("Note: ",this.noteId,  "was updated.");
    }
    this.router.navigateByUrl('/');
  }
  cancel() {

    //this function route the cancel button to the notes-list-component
    this.router.navigateByUrl('/');
  }
}
