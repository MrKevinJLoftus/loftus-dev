import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/general.model';
import { FetchGoalResponse, Goal } from '../models/metrix.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MetrixService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /**
   * Create new goal.
   */
  createGoal(newGoal: Goal): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}/metrix/goal`, newGoal).pipe(
      catchError((error) => {
        this.messageService.show(error.message);
        return throwError(error);
      }),
      tap((res) => {
        this.messageService.show(res.message);
      })
    );
  }

  /**
   * Fetch all existing goals and updates for current user.
   */
  fetchAllGoalsAndUpdates(): Observable<FetchGoalResponse> {
    return this.http.get<FetchGoalResponse>(`${environment.apiUrl}/metrix/goals`).pipe(
      catchError((error) => {
        this.messageService.show(error.message);
        return throwError(error);
      })
    );
  }
}
