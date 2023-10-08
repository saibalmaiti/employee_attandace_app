import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  constructor(private service: EmployeeService, private router: Router, private auth: AuthService) { }
employee: any;
email:String="";
  ngOnInit(): void {
    this.service.getEmployeebyId(Number(localStorage.getItem("userid"))).subscribe({
      next: (res) => {
        console.log(res);
        this.employee = res;
        this.email = String(localStorage.getItem("email"));
      },
      error: (e) => {
        console.error(e.message);
        if(e.message == "Unauthorized Request") {
          this.auth.logout();
        }
      }
    })
  }

}
