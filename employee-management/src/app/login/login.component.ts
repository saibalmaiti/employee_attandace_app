import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {userName:"", password:""}
  alert = false;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  loginUser(loginForm: NgForm) {
    this.authService.loginUser(this.loginUserData).subscribe({
      next:(res) => {console.log(res)
                      localStorage.setItem('jwttoken',res.jwttoken);
                      localStorage.setItem('userid',res.userid);
                      localStorage.setItem('email',res.email);
                      localStorage.setItem('role',res.role);
                      loginForm.reset();
                      if(res.role == 'ROLE_ADMIN')
                        this.router.navigate(['/admindashboard']);
                      else
                        this.router.navigate(['/employeedashboard']);
                    },
      error: (e) => {console.error(e.message)
                      if(e.message == 'INVALID_CREDENTIALS')
                        this.alert = true
                        setTimeout(() => this.alert = false, 5000);}
    })
  }


}
