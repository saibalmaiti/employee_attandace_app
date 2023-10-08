import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Employee } from 'src/app/employee';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  constructor(private service:AdminService, private router:Router, private activedRoute:ActivatedRoute, private auth:AuthService) { }
  employee:any;
  ngOnInit(): void {
    this.employee = history.state;
    console.log(this.employee);
  }
  onSubmit(employee:Employee) {
    this.service.updateEmployee(employee.userid, employee).subscribe({
      next: ()=> {this.router.navigate(["/admindashboard"]);},
      error: (e) => {
        console.error(e.message);
        if(e.message == "Unauthorized Request") {
          this.auth.logout();
        }
      }

    })
  }
  onCancel(){
    this.router.navigate(["/admindashboard"]);
  }

}
