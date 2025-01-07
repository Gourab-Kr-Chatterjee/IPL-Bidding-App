import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AdminComponent } from '../admin/admin.component';
import { OrganizerComponent } from '../organizer/organizer.component';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { ErrorComponent } from '../error/error.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path : "",
    component : HomeComponent,

  },
  {
    path : "admin",
    component : AdminComponent,
    canActivate : [AuthGuard]
  },
  {
    path : "organizer",
    component : OrganizerComponent,
    canActivate : [AuthGuard]
  },
  {
    path : "login",
    component : LoginComponent
  },
  {
    path : "signup",
    component : RegistrationComponent
  },
  {
    path : "error",
    component : ErrorComponent
  },
  {
    path : "**",
    component : ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
