import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Goal } from 'src/app/shared/models/metrix.model';
import { MetrixService } from 'src/app/shared/services/metrix.service';

@Component({
  selector: 'app-all-goals',
  templateUrl: './all-goals.component.html',
  styleUrls: ['./all-goals.component.scss']
})
export class AllGoalsComponent implements OnInit, OnDestroy {
  goals: Goal[] = [];
  $subscription: Subscription = new Subscription();

  constructor(private metrixService: MetrixService) { }

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

}
