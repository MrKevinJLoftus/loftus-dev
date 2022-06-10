import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChoresService } from 'src/app/shared/services/chores.service';

@Component({
  selector: 'app-create-chore-form',
  templateUrl: './create-chore-form.component.html',
  styleUrls: ['./create-chore-form.component.scss']
})
export class CreateChoreFormComponent implements OnInit {

  choreForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private choresService: ChoresService
  ) { }

  ngOnInit(): void {
  }

  initForm(): void {
    this.choreForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  submitForm(): void {
    const { description } = this.choreForm.value;
    this.choresService.createNewChore(description).subscribe();
  }

}
