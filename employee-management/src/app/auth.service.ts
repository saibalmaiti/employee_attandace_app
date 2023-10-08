import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = "http://localhost:8765/REGISTRATION-SERVICE/authenticate";
  private _resetpasswordUrl = "http://localhost:8765/REGISTRATION-SERVICE/resetpassword";
  constructor(private http: HttpClient, private router:Router) { }
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
        return throwError(() => new Error(error.error.message));
    }
  }
  private handleError2(error: HttpErrorResponse) {
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
  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user).pipe(catchError(this.handleError));
  }
  loggedIn(): boolean{
    return !!localStorage.getItem('jwttoken');
  }
  logout(){
    localStorage.removeItem("jwttoken");
    localStorage.removeItem('userid');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    this.router.navigate(["/"]);
  }
  resetPassword(user: any) {
    return this.http.put<any>(this._resetpasswordUrl,user,{headers: new HttpHeaders({Authorization: "Bearer " + localStorage.getItem("jwttoken")})}).pipe(catchError(this.handleError2));
  }
}
