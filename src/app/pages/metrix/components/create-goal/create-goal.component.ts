import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/models/general.model';
import { Frequency, Goal } from 'src/app/shared/models/metrix.model';
import { MetrixService } from 'src/app/shared/services/metrix.service';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.scss']
})
export class CreateGoalComponent implements OnInit {
  goalForm!: FormGroup;
  frequencies: Frequency[] = [
    {
      numDays: 1,
      description: 'Daily'
    },
    {
      numDays: 2,
      description: 'Every Other Day'
    },
    {
      numDays: 7,
      description: 'Weekly'
    },
    {
      numDays: 30,
      description: 'Monthly'
    },
    {
      numDays: -1,
      description: 'Other'
    }
  ];

  constructor(private fb: FormBuilder, private metrixService: MetrixService, private router: Router) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  /**
   * Initialize FormGroup.
   */
  initForm(): void {
    this.goalForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      frequency: ['', [Validators.required, Validators.pattern(/\d+/)]],
      otherFreq: ['', Validators.pattern(/\d+/)]
    }, { validators: this.otherFreqRequiredValidator });
  }

  /**
   * Submit form values to create new goal.
   */
  submitForm(): void {
    if (this.goalForm.valid) {
      const { name, description, frequency, otherFreq } = this.goalForm.value;
      const newGoal: Goal = {
        name,
        description,
        frequency: this.showOtherFreqInput ? otherFreq : frequency
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

  /**
   * otherFreq FormControl is required if frequency control selection is 'other'.
   */
  otherFreqRequiredValidator(control: AbstractControl): ValidationErrors | null {
    const freq = control.get('frequency');
    const otherFreq = control.get('otherFreq');
    return freq.value < 1 && (!otherFreq.value || otherFreq.value === '') ? { otherFreqReq: true } : null;
  };

  /**
   * Determine if 'other' selected and need to display custom frequency input control.
   */
  get showOtherFreqInput(): boolean {
    const freq = this.goalForm.get('frequency');
    return !!freq && freq.value < 0;
  }

}
