import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChoresService } from 'src/app/shared/services/chores.service';

@Component({
  selector: 'app-log-work-form',
  templateUrl: './log-work-form.component.html',
  styleUrls: ['./log-work-form.component.scss']
})
export class LogWorkFormComponent implements OnInit {

  logWorkForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private choresService: ChoresService
  ) { }

  ngOnInit(): void {
  }

  initForm(): void {
    this.logWorkForm = this.fb.group({
      choreId: ['', Validators.required],
      personId: ['', Validators.required],
      notes: ['', Validators.required]
    });
  }

  submitForm(): void {
    const { name } = this.logWorkForm.value;
    this.choresService.createNewPerson(name).subscribe();
  }

}
