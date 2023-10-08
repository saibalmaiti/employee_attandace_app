import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {

  constructor(private service: AdminService, private router: Router, private route: ActivatedRoute) { }
  id = 0;
  name = "";
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.name = this.route.snapshot.params['name']
  }
  onDelete(): void {
    this.service.deleteEmployee(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(["/admindashboard"]);
      },
      error: (err) => {
        alert("Error Deleteing employee");
        this.router.navigate(['/admindashboard']);
      }
    })
  }

  onCancel(): void {
    this.router.navigate(["/admindashboard"]);
  }

}
