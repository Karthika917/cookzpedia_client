import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Api } from '../Service/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [Header,Footer,FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  downloadsList:any[]=[]

  profile:string="https://cdn-icons-png.flaticon.com/128/3033/3033143.png"
  username:string=""
    
  constructor(private api:Api){}

  ngOnInit(){
    this.getDownloads()
    if(sessionStorage.getItem('uname')){
      this.username=sessionStorage.getItem('uname') ||""
      if(sessionStorage.getItem('profile')){
        this.profile=sessionStorage.getItem('profile')|| "https://cdn-icons-png.flaticon.com/128/3033/3033143.png"
      }
    }
  }

  getDownloads(){
    this.api.getDownloadedRecipesApi().subscribe({
      next:(res:any)=>{
        console.log(res)
        this.downloadsList=res
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

 handleDelete(rid: any) {
   console.log("Deleting recipeId:", rid);
  this.api.deleteDownloadedRecipesApi(rid).subscribe({
    next: (res: any) => {
      this.downloadsList = this.downloadsList.filter(
        (item: any) => item.recipeId !== rid
      );
    },
    error: (err) => {
      console.log(err);
      alert("Delete failed");
    }
  });
}



  getFile(e:any){
    const file=e?.target?.files[0]
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload=(event:any)=>{
      console.log(event.target.result)
      this.profile=event.target.result
    }
  }

  handleProfileUpdate(){
    if(!this.username || !this.profile){
      alert("Enter valid inputs")
    }
    else{
      this.api.profileUpdateApi({username:this.username,profile:this.profile}).subscribe({
        next:(res:any)=>{
          alert("Profile Updated")
          sessionStorage.setItem('uname',this.username)
          sessionStorage.setItem('profile',this.profile)
        },
        error:(err:any)=>{
          alert("Profile updation failed")
          this.profile = sessionStorage.getItem('profile') ||"https://cdn-icons-png.flaticon.com/128/3033/3033143.png"
          this.username = sessionStorage.getItem('uname') ||""
        }
      })
    }
  }

}
