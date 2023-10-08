import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css']
})
export class EmployeeAttendanceComponent implements OnInit {
  attendanceObj = {
    endTime: "",
    startTime: "",
    userid: -1
  }
date = new Date().toLocaleDateString('en-us', {weekday:"long", year:"numeric",month:"short",day:"numeric"});
  constructor(private router:Router,private auth:AuthService, private service:EmployeeService) { }

  // {
  //   "endTime": "10:00:00",
  //   "startTime": "20:00:00",
  //   "userid": 1
  // }
  ngOnInit(): void {
  }
  giveAttendance(attendanceForm: NgForm) {
    console.log(this.attendanceObj.endTime > this.attendanceObj.startTime);
    this.attendanceObj.endTime = this.attendanceObj.endTime+":00";
    this.attendanceObj.startTime = this.attendanceObj.startTime+":00";
    this.attendanceObj.userid = Number(localStorage.getItem("userid"));
    // console.log(this.attendanceObj);
    this.service.giveAttendance(this.attendanceObj).subscribe({
      next:(res)=> {
        console.log(res);
        alert("Attendance Successfully Given");
        attendanceForm.reset();
        this.router.navigate(['/employeedashboard']);
      },
      error:(e)=>{
        console.log(e.message);
        if(e.message == "Unauthorized Request") {
          this.auth.logout();
        }
        else if(e.message ==  "Attendance Already Given"){
          alert("Attendance Alread Given for Today");
        }
        else{
          alert("Some Error Occured Please Retry");
        }
      }
    })
  }
  onCancel() {
    this.router.navigate(['/employeedashboard']);
  }

}
