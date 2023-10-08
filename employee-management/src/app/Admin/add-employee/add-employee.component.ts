import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private service:AdminService, private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(employee: any): void {
    this.service.addEmployee(employee).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(["/admindashboard"]);
      },
      error: (err) => {
        console.error(err.message);
        if(err.message == "Unauthorized Request") {
          this.auth.logout();
        }
      }
    })
  }
  onCancel(): void {
    this.router.navigate(["/admindashboard"]);
  }

}
