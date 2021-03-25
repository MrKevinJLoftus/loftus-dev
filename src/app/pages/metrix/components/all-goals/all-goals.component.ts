import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Goal } from 'src/app/shared/models/metrix.model';
import { MetrixService } from 'src/app/shared/services/metrix.service';
import { GoalUpdateComponent } from '../goal-update/goal-update.component';

@Component({
  selector: 'app-all-goals',
  templateUrl: './all-goals.component.html',
  styleUrls: ['./all-goals.component.scss']
})
export class AllGoalsComponent implements OnInit, OnDestroy {
  goals: Goal[] = [];
  $subscription: Subscription = new Subscription();

  constructor(private metrixService: MetrixService, private dialog: MatDialog) { }

  /**
   * Initialize component.
   */
  ngOnInit(): void {
    this.fetchAllGoals();
  }

  /**
   * Unsubscribe.
   */
  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }

  /**
   * Fetch all goals from API for current user.
   */
  fetchAllGoals(): void {
    this.$subscription.add(
      this.metrixService.fetchAllGoalsAndUpdates().subscribe(
        (res) => {
          this.goals = res.goals;
        }
      )
    );
  }

  /**
   * Open MatDialog with the GoalUpdateComponent.
   */
  openUpdateDialog(goal: Goal): void {
    const dialogRef = this.dialog.open(GoalUpdateComponent, {
      data: goal
    });
    this.$subscription.add(dialogRef.afterClosed().subscribe((res) => {
      this.fetchAllGoals();
    }));
  }
}
