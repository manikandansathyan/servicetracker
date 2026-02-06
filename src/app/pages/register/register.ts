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
      alert("Please fill all fields correctly");
      return;
    }

    const { name, email, pswd, cpswd } = this.form.value;

    if (pswd !== cpswd) {
     
      return;
    }

    this.api.getUserByEmail(email).subscribe((users: any[]) => {

      if (users.length > 0) {
        alert("Email already registered");
        return;
      }

      const newUser = { name, email, pswd };

      this.api.registerUser(newUser).subscribe(() => {
        alert("Registration Successful");
        console.log(newUser);
        this.route.navigateByUrl('/login');
        this.form.reset();
      });

    });
  }
}
