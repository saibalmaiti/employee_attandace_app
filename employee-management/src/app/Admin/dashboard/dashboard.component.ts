import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Employee } from 'src/app/employee';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employees:Employee[] = [];
  retry:boolean = false;

  constructor(private service:AdminService, private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
    this.retry = false;
    this.service.getEmployees().subscribe({
      next:(res) => {
        this.employees = res;
        console.log(res);
      },
      error:(e) => {
        console.error(e.message);
        if(e.message == "Unauthorized Request") {
          this.auth.logout();
        }
        else{
          this.retry = true;
        }
      }
    })
  }
  addEmployee(): void{
    this.router.navigate(['/addemployee']);
  }
  updateEmployee(employee:Employee): void {
    this.router.navigateByUrl('/update',{state: employee});
  }
  deleteEmployee(id:number, name:String): void {
    this.router.navigate(["/delete/"+id+"/"+name]);
  }
  logout(): void {
    this.auth.logout();
  }


}
