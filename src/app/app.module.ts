import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// App routing modules
import { AppRoutingModule } from './app-routing.module';

// App Services
import { AuthService } from './services/auth.service';
import { PostsService } from './services/posts.service';

// App Components
import { AppComponent } from "./app.component";
import { PostComponent } from "./components/post/post.component";
import { NavComponent } from "./components/nav/nav.component";
import { SuggestionsComponent } from "./components/suggestions/suggestions.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignUpComponent } from './components/signup/signup.component';
import { LogInComponent } from './components/login/login.component';

// Firebase services + environment
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from "../environments/environment";
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ModalModule } from './_modal';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    NavComponent,
    SuggestionsComponent,
    SignUpComponent,
    LogInComponent,
    DashboardComponent,
    VerifyEmailComponent,

  ],
  imports: [
    BrowserModule, // saying Angular to work in Browser
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ModalModule,
  ],
  providers: [PostsService, AuthService], //services, interseptions. By doing this our authentication service will be available throughout the application
  bootstrap: [AppComponent],
})
export class AppModule { }
