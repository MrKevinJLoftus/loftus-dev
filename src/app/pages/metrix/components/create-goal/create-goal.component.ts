import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/models/general.model';
import { Goal } from 'src/app/shared/models/metrix.model';
import { MetrixService } from 'src/app/shared/services/metrix.service';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.scss']
})
export class CreateGoalComponent {
  goalForm!: FormGroup;

  constructor(private fb: FormBuilder, private metrixService: MetrixService, private router: Router) {
    this.initForm();
  }

  /**
   * Initialize FormGroup.
   */
  initForm(): void {
    this.goalForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  /**
   * Submit form values to create new goal.
   */
  submitForm(): void {
    if (this.goalForm.valid) {
      const { name, description, frequency, otherFreq } = this.goalForm.value;
      const newGoal: Goal = {
        name,
        description
      };
      this.metrixService.createGoal(newGoal).subscribe((res: ApiResponse) => {
        this.router.navigate(['/metrix/all']);
      });
    }
  }

  /**
   * Reset the form.
   */
  clearForm(): void {
    this.goalForm.reset();
  }
}
