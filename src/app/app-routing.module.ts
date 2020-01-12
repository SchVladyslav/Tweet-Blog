import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import canActivate guard services
import { AuthGuard } from "./auth.guard";
import { SecureInnerPagesGuard } from "./secure-inner-pages.guard";

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'sign-up', loadChildren: () => import('./components/signup/signup.module').then(mod => mod.SignUpModule), canActivate: [SecureInnerPagesGuard] },
  { path: 'log-in', loadChildren: () => import('./components/login/login.module').then(mod => mod.LogInModule), canActivate: [SecureInnerPagesGuard] },
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(mod => mod.DashboardModule), canActivate: [AuthGuard] },
  { path: 'verify-email', loadChildren: () => import('./components/verify-email/verify-email.module').then(mod => mod.VerifyEmailModule), canActivate: [SecureInnerPagesGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
