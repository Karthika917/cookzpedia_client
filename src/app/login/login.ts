import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder,ReactiveFormsModule,Validators } from '@angular/forms';
import { Api } from '../Service/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  logForm:any=""
  
  constructor(private fb:FormBuilder,private api:Api,private router:Router){
      this.logForm = this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]]
      })
     }

     handleSignIn(){
      console.log(this.logForm.value)
      this.api.userSignInApi(this.logForm.value).subscribe({
        next:(res:any)=>{
          alert("Signin successfull")
          console.log(res)
          sessionStorage.setItem('token',res.token)
          sessionStorage.setItem('uname',res.user)
          sessionStorage.setItem('role',res.role)
          res?.role=="Admin"?this.router.navigateByUrl('/admin'):this.router.navigateByUrl('/')
      
        },
        error:(err:any)=>{
          alert("Something went wrong")
          console.log(err)
          if(err?.error){
            alert(err.error)
          }
        }
      })
     }
  

}
