import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components
import { SignUpComponent } from './components/signup/signup.component';
import { LogInComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { VerifyEmailComponent } from './components/verify-email/verify-email.component'

// Import canActivate guard services
import { AuthGuard } from "./auth.guard";
import { SecureInnerPagesGuard } from "./secure-inner-pages.guard";

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'log-in', component: LogInComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'verify-email', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
