import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apiservice } from '../../services/apiservice';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {


  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private api: Apiservice
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      pswd: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      cpswd: ['', [Validators.required]]
    });
  }



  register() {
    if (this.form.invalid) {
      alert('Please fill the form correctly');
      return;
    }

    const { name, email, pswd, cpswd } = this.form.value;

    if (pswd !== cpswd) {
      alert("Passwords do not match");
      return;
    }

    this.api.registerUser({
      name,
      email,
      password: pswd
    }).subscribe({
      next: (res: any) => {
        alert('Registration Successful');
        this.route.navigateByUrl('login');
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }

}
