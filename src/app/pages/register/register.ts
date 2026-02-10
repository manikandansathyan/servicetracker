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
  

  // form: FormGroup;

  // constructor(
  //   private fb: FormBuilder,
  //   private route: Router,
  //   private api: Apiservice
  // ) {
  //   this.form = this.fb.group({
  //     name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
  //     email: ['', [Validators.required, Validators.email]],
  //     pswd: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
  //     cpswd: ['', [Validators.required]]
  //   });
  // }

regForm:FormGroup

    constructor( private fb: FormBuilder,
    private route: Router,
    private api: Apiservice){
      this.regForm=this.fb.group({
        name:['',[Validators.required]],
        email:['',[[Validators.email]]],
        password:['',[Validators.required]]
      })
    }
    
    regsiter(){
        const name=this.regForm.value.username
        const email=this.regForm.value.email
        const password=this.regForm.value.password

        console.log(name,email,password);
        
        if(this.regForm.valid){
          // alert('reg')
          this.api.registerUser({name,email,password}).subscribe({
            next:(res:any)=>{
              console.log(res);
              if(res.status==200){
                alert('Registration Successful');
                this.route.navigateByUrl('/login')
              }
              
            },
            error:(err)=>{
              alert(err.error.message)
              console.log(err);              
            },
          })
        }else{
          alert('Please fill the form')
        }
          
        
    }
}
