import { Component, OnInit } from '@angular/core';
import { ChoresService } from 'src/app/shared/services/chores.service';
import { CompletedTask, DashboardDataRow } from '../../chores.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardData: DashboardDataRow[] = [];

  constructor(private choresService: ChoresService) { }

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(): void {
    this.choresService.getDashboardData().subscribe(
      (res: DashboardDataRow[]) => this.dashboardData = res
    );
  }

}
