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
      password: ['', [Validators.required]]
    });
  }

  login() {

    if (this.form.valid) {


      const { email, password } = this.form.value;

      // 🔍 Check from JSON server
      this.api.loginUser(email, password).subscribe((users: any[]) => {

        if (users.length > 0) {
          alert('Login Successful 🎉');

          this.route.navigateByUrl('tracker');
        } else {
          alert('Incorrect email or password');
        }

      });
    }

  }


}



