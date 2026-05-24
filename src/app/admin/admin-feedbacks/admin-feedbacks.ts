import { Component } from '@angular/core';
import { Api } from '../../Service/api';

@Component({
  selector: 'app-admin-feedbacks',
  standalone: false,
  templateUrl: './admin-feedbacks.html',
  styleUrl: './admin-feedbacks.css',
})
export class AdminFeedbacks {

  feedbackList:any[]=[]
  
  constructor(private api:Api){}

  ngOnInit(){
    this.getData()
  }

  getData(){
    this.api.getAdminFeedbacksApi().subscribe({
      next:(res:any)=>{
        this.feedbackList=res
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  handleDelete(id:any){
    this.api.deleteAdminFeedbackApi(id).subscribe({
      next:(res:any)=>{
        alert("Feedback deleted")
        this.getData()
      },
      error:(err:any)=>{
        alert("Something went wrong!")
        console.log(err)
      
      }
    })
  }
}
