import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _giveattendanceUrl = "http://localhost:8765/ATTENDANCE-SERVICE/giveattendance";
  private _getAttendanceUrl = "http://localhost:8765/ATTENDANCE-SERVICE/getweeklyattendance/";
  constructor(private http:HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      return throwError(() => new Error('Something bad happened; please try again later.'));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error.response);
        if(error.error.response ==  "Attendance Already Given"){
          return throwError(() => new Error( "Attendance Already Given"));
        }
        return throwError(() => new Error("Unauthorized Request"));
    }
  }

  getEmployeebyId(id:number):Observable<Employee> {
    return this.http.get<Employee>("http://localhost:8765/EMPLOYEE-SERVICE/employee/"+id,{headers: new HttpHeaders({Authorization: "Bearer " + localStorage.getItem("jwttoken")})}).pipe(catchError(this.handleError));
  }
  giveAttendance(attendanceObj:any) {
    return this.http.post<any>(this._giveattendanceUrl,attendanceObj,{headers: new HttpHeaders({Authorization: "Bearer " + localStorage.getItem("jwttoken")})}).pipe(catchError(this.handleError));
  }
  getAttendance(id:number) {
    return this.http.get<any>(this._getAttendanceUrl+id, {headers: new HttpHeaders({Authorization: "Bearer " + localStorage.getItem("jwttoken")})}).pipe(catchError(this.handleError));
  }
}

