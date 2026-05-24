import { Component } from '@angular/core';
import { Api } from '../../Service/api';


@Component({
  selector: 'app-admin-recipelist',
  standalone: false,
  templateUrl: './admin-recipelist.html',
  styleUrl: './admin-recipelist.css',
})
export class AdminRecipelist {

  recipeList:any[]=[]
  searchKey:string=""

  constructor(private api:Api){}

  ngOnInit(){
    this.getData()
  }

  getData(){
    this.api.getAdminRecipesApi().subscribe({
      next:(res:any)=>{
      this.recipeList = res
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  handleDelete(id:any){
    this.api.deleteRecipeApi(id).subscribe({
      next:(res:any)=>{
        this.getData()
      },
      error:(err:any)=>{
        alert("Something went wrong")
        console.log(err)
      }
    })
  }

}
