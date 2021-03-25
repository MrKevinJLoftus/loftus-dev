import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Goal, GoalUpdate } from 'src/app/shared/models/metrix.model';
import { MetrixService } from 'src/app/shared/services/metrix.service';

@Component({
  selector: 'app-goal-update',
  templateUrl: './goal-update.component.html',
  styleUrls: ['./goal-update.component.scss']
})
export class GoalUpdateComponent implements OnInit {
  updateForm!: FormGroup;
  ratingsArray: number[] = [];
  rating = 0;
  readonly numStars = 10;

  constructor(
    private metrixService: MetrixService,
    public dialogRef: MatDialogRef<GoalUpdateComponent>,
    private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Goal
  ) {
    this.initForm();
    this.initRatingsArray();
  }

  ngOnInit(): void {
  }

  /**
   * Initialize FormGroup.
   */
  initForm(): void {
    this.updateForm = this.fb.group({
      description: ['', Validators.required],
      rating: ['', [Validators.required, Validators.pattern(/\d+/)]]
    });
  }

  /**
   * Submit the goal update.
   */
  submitForm(): void {
    if (this.updateForm.valid) {
      const { description, rating } = this.updateForm.value;
      const update: GoalUpdate = {
        description,
        rating
      }
      this.metrixService.updateGoal(this.data.goalId, update).subscribe((res) => {
        this.dialogRef.close();
      });
    }
  }

  /**
   * Reset form.
   */
  clearForm(): void {
    this.updateForm.reset();
    this.rating = 0;
  }

  /**
   * Populate an array that will create numStars stars in the template.
   */
  initRatingsArray() {
    for (let i = 0; i < this.numStars; i++) {
      this.ratingsArray.push(i);
    }
  }

  /**
   * Determine whether to show a filled-in star or an outline of a star.
   */
  getIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    }
    return 'star_border';
  }

  /**
   * Set rating when user clicks on a mat-icon-button.
   */
  setRating(index: number) {
    this.rating = index + 1;
    this.updateForm.get('rating').setValue(this.rating);
  }

}
