import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apiservice } from '../../services/apiservice';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private api: Apiservice
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pswd: ['', [Validators.required]]
    });
  }

  login() {

    if (this.form.invalid) {
      alert('Please enter valid details');
      return;
    }

    const { email, pswd } = this.form.value;

    // 🔍 Check from JSON server
    this.api.loginUser(email, pswd).subscribe((users: any[]) => {

      if (users.length > 0) {
        alert('Login Successful 🎉');

        // optional session flag
        sessionStorage.setItem('isLoggedIn', 'true');

        this.route.navigateByUrl('/tracker');
      } else {
        alert('Incorrect email or password');
      }

    });
  }


}



