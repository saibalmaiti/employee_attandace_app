import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './Admin/add-employee/add-employee.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { DeleteEmployeeComponent } from './Admin/delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from './Admin/update-employee/update-employee.component';
import { ChangePasswordComponent } from './Employee/change-password/change-password.component';
import { EmployeeAttendanceComponent } from './Employee/employee-attendance/employee-attendance.component';
import { EmployeeDashboardComponent } from './Employee/employee-dashboard/employee-dashboard.component';
import { EmployeeProfileComponent } from './Employee/employee-profile/employee-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'admindashboard', component:DashboardComponent, canActivate:[AuthGuard,RoleGuard]},
  {path:'addemployee', component:AddEmployeeComponent, canActivate:[AuthGuard, RoleGuard]},
  {path:"delete/:id/:name", component:DeleteEmployeeComponent, canActivate:[AuthGuard, RoleGuard]},
  {path:"update", component:UpdateEmployeeComponent, canActivate:[AuthGuard, RoleGuard]},
  {path:'employeedashboard', component:EmployeeDashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component:EmployeeProfileComponent, canActivate:[AuthGuard]},
  {path:'changepassword', component: ChangePasswordComponent, canActivate:[AuthGuard]},
  {path:'giveattendance', component:EmployeeAttendanceComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
