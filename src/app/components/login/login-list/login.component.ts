import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LogInComponent implements OnInit {

  form: FormGroup;
  authError: any;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.eventAuthError$.subscribe(error => {
      this.authError = error;
    })

    this.form = new FormGroup({
      email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {
    const formData = this.form.value;
    this.authService.LogIn(formData.email, formData.password);
  }

  get authServiceAccess() { // for production
    return this.authService;
  }

}
