import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormGroup,FormControl, FormBuilder,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../Service/api';

@Component({
  selector: 'app-reg',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './reg.html',
  styleUrl: './reg.css',
})
export class Reg {

  regForm:any;

     constructor(private fb:FormBuilder, private router:Router,private api:Api){
      this.regForm = this.fb.group({
        username: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9@_]+$')]],
        password:['',[Validators.required]],
        email:['',[Validators.required,Validators.email]]
      })
     }

    
handleSubmit(){
  console.log(this.regForm.value)
  this.api.userSignUpAi(this.regForm.value).subscribe({
    next:(res:any)=>{
      alert("Signup success")
      this.router.navigateByUrl('/signin')
    },
    error:(err:any)=>{
      alert("something went wrong!!...signup failed")
      console.log(err)
      if(err?.error){
        alert(err.error)
      }
    }
  })
}
     
}
