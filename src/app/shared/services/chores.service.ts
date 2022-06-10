import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Chore, Person, CompletedTask, NewTask, DashboardDataRow } from 'src/app/pages/chores/chores.model';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/general.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ChoresService {

  private url = `${environment.apiUrl}/chores`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  stdErrorHandler(error: any) {
    this.messageService.show(error.message);
    return throwError(error);
  }

  // Chores Endpoints

  createNewChore(description: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}`, { description }).pipe(
      catchError((error) => this.stdErrorHandler(error)),
      tap((res) => {
        this.messageService.show(res.message);
      })
    );
  }

  getAllChores(): Observable<Chore[]> {
    return this.http.get<{ chores: Chore[] }>(`${this.url}`).pipe(
      map(res => res.chores),
      catchError((error) => this.stdErrorHandler(error))
    );
  }

  deleteChore(choreId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.url}/${choreId}`).pipe(
      catchError((error) => this.stdErrorHandler(error)),
      tap((res) => {
        this.messageService.show(res.message);
      })
    );
  }

  // People Endpoints

  getAllPeople(): Observable<Person[]> {
    return this.http.get<{ people: Person[] }>(`${this.url}/people`).pipe(
      map(res => res.people),
      catchError((error) => this.stdErrorHandler(error))
    );
  }

  createNewPerson(name: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}/people`, { name }).pipe(
      catchError((error) => this.stdErrorHandler(error)),
      tap((res) => {
        this.messageService.show(res.message);
      })
    );
  }

  // Tasks Endpoints

  getAllTasks(): Observable<CompletedTask[]> {
    return this.http.get<{ tasks: CompletedTask[] }>(`${this.url}/tasks`).pipe(
      map(res => res.tasks),
      catchError((error) => this.stdErrorHandler(error))
    );
  }

  logNewTask(task: NewTask): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}/tasks`, { task }).pipe(
      catchError((error) => this.stdErrorHandler(error)),
      tap((res) => {
        this.messageService.show(res.message);
      })
    );
  }

  getDashboardData(): Observable<DashboardDataRow[]> {
    return this.http.get<{ data: DashboardDataRow[] }>(`${this.url}/dashboard`).pipe(
      map(res => res.data),
      catchError((error) => this.stdErrorHandler(error))
    );
  }
}
