import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  _profileUrl = "http://localhost:8765/EMPLOYEE-SERVICE/employee";
  _addemployeeUrl = "http://localhost:8765/EMPLOYEE-SERVICE/employee";
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      return throwError(() => new Error('Something bad happened; please try again later.'));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        return throwError(() => new Error("Unauthorized Request"));
    }
  }
  getEmployees(): Observable<Employee []> {
    return this.http.get<Employee []>(this._profileUrl,{headers: new HttpHeaders({Authorization: "Bearer " + localStorage.getItem("jwttoken")})}).pipe(catchError(this.handleError));
  }

  addEmployee(employee:any): Observable<Response> {
    return this.http.post<Response>(this._addemployeeUrl, employee,{headers: new HttpHeaders({Authorization: "Bearer " + localStorage.getItem("jwttoken")})}).pipe(catchError(this.handleError));
  }
  updateEmployee(id:number, employee:Employee): Observable<Employee> {
    console.log(id);
    console.log(employee);
    return this.http.put<Employee>("http://localhost:8765/EMPLOYEE-SERVICE/employee/"+id, employee, {headers: new HttpHeaders({Authorization: "Bearer " + localStorage.getItem("jwttoken")})}).pipe(catchError(this.handleError));
  }
  deleteEmployee(id:number): Observable<Employee> {
    return this.http.delete<Employee>("http://localhost:8765/EMPLOYEE-SERVICE/employee/"+id,{headers: new HttpHeaders({Authorization: "Bearer " + localStorage.getItem("jwttoken")})}).pipe(catchError(this.handleError));
  }
}
