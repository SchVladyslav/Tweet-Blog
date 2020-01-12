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

// Firebase services + environment
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, // saying Angular to work in Browser
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [PostsService, AuthService], //services, interseptions. By doing this our authentication service will be available throughout the application
  bootstrap: [AppComponent],
})
export class AppModule { }
