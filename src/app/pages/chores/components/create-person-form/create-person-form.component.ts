import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChoresService } from 'src/app/shared/services/chores.service';

@Component({
  selector: 'app-create-person-form',
  templateUrl: './create-person-form.component.html',
  styleUrls: ['./create-person-form.component.scss']
})
export class CreatePersonFormComponent implements OnInit {

  personForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private choresService: ChoresService
  ) { }

  ngOnInit(): void {
  }

  initForm(): void {
    this.personForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  submitForm(): void {
    const { name } = this.personForm.value;
    this.choresService.createNewPerson(name).subscribe();
  }

}
