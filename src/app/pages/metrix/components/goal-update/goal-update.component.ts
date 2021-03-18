import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Goal } from 'src/app/shared/models/metrix.model';
import { MetrixService } from 'src/app/shared/services/metrix.service';

@Component({
  selector: 'app-goal-update',
  templateUrl: './goal-update.component.html',
  styleUrls: ['./goal-update.component.scss']
})
export class GoalUpdateComponent implements OnInit {

  constructor(
    private metrixService: MetrixService,
    public dialogRef: MatDialogRef<GoalUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Goal
  ) { }

  ngOnInit(): void {
  }

}
