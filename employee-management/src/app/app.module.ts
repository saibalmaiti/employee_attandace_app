import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { AddEmployeeComponent } from './Admin/add-employee/add-employee.component';
import { DeleteEmployeeComponent } from './Admin/delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from './Admin/update-employee/update-employee.component';
import { EmployeeDashboardComponent } from './Employee/employee-dashboard/employee-dashboard.component';
import { EmployeeProfileComponent } from './Employee/employee-profile/employee-profile.component';
import { EmployeeNavbarComponent } from './Employee/employee-navbar/employee-navbar.component';
import { ChangePasswordComponent } from './Employee/change-password/change-password.component';
import { EmployeeAttendanceComponent } from './Employee/employee-attendance/employee-attendance.component';
import { EmployeeGraphComponent } from './Employee/employee-graph/employee-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddEmployeeComponent,
    DeleteEmployeeComponent,
    UpdateEmployeeComponent,
    EmployeeDashboardComponent,
    EmployeeProfileComponent,
    EmployeeNavbarComponent,
    ChangePasswordComponent,
    EmployeeAttendanceComponent,
    EmployeeGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
