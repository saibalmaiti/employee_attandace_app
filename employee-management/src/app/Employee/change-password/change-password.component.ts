import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }
  passwordData ={newPassword:"", confirmPassword:""}

  ngOnInit(): void {
  }
  changePassword(passwordForm:NgForm) {
      let user = {
        "email": "",
        "password": "",
        "role": "",
        "userid": -1
      }
      user.email = String(localStorage.getItem("email"));
      user.password = this.passwordData.newPassword;
      user.role = String(localStorage.getItem("role"));
      user.userid = Number(localStorage.getItem("userid"));
      this.auth.resetPassword(user).subscribe({
        next:() => {
          alert("Password Changed Successfully");
          passwordForm.resetForm();
          this.router.navigate(['/employeedashboard']);
        },
        error:(e) => {
          console.error(e.message);
          if(e.message == "Unauthorized Request") {
            this.auth.logout();
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
