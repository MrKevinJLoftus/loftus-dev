import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Goal } from 'src/app/shared/models/metrix.model';
import { MetrixService } from 'src/app/shared/services/metrix.service';

@Component({
  selector: 'app-metrix',
  templateUrl: './metrix.component.html',
  styleUrls: ['./metrix.component.scss']
})
export class MetrixComponent implements OnInit, OnDestroy {
  goals: Goal[] = [];
  $subscription: Subscription = new Subscription();

  constructor(private metrixService: MetrixService) { }

  ngOnInit(): void {
    this.fetchAllGoals();
  }

  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }

  fetchAllGoals(): void {
    this.$subscription.add(this.metrixService.fetchAllGoalsAndUpdates().subscribe((res) => {
      this.goals = res.goals;
    }));
  }

}
