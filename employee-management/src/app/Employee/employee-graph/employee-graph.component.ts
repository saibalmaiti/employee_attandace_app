import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/auth.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-graph',
  templateUrl: './employee-graph.component.html',
  styleUrls: ['./employee-graph.component.css']
})
export class EmployeeGraphComponent implements OnInit {

  constructor(private service:EmployeeService, private auth: AuthService) {
    Chart.register(...registerables);
  }
  data:number[]=[];
  labels:any[] = [];

  ngOnInit(): void {
    this.service.getAttendance(Number(localStorage.getItem("userid"))).subscribe({
      next: (res)=> {
        this.data = res;
        console.log(this.data);
        this.labels = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thrusday', 'Friday', 'Saturday'];
        const myChart = new Chart("myChart",{type: 'bar',
    data: {
        labels: this.labels,
        datasets: [{
            label: 'Hours of Work',
            data: this.data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                grace:2
            }
        }
        }});
      },
      error: (e) =>{
        console.log(e.message);
        if(e.message == "Unauthorized Request") {
          this.auth.logout();
        }
        else{
          alert("Some Error Occured Please Retry");
        }
      }
    })

  }

}
