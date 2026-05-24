import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Api } from '../Service/api';
import { SearchPipe } from '../pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  imports: [Header, Footer, SearchPipe,FormsModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {

  allRecipes:any[]=[]
  cuisineList:any[]=[]
  mealTypeList:any[]=[]
  searchKey:string=""

  constructor(private api:Api,private router:Router){

  }

  ngOnInit(){
    this.getAllRecipes()
  }

  setFilterKeyword(filter:string){
    this.searchKey=filter
  }

  getAllRecipes(){
    this.api.getAllRecipesApi().subscribe({
      next:(res:any)=>{
        console.log(res)
        //setting cuisine list for filter
        const cuisineArray = res?.map((item:any)=>item.cuisine)
        const cuisineSet = new Set(cuisineArray)                 //set automatically removes duplicates
        this.cuisineList =[...cuisineSet]
        //setting mealtype list for filter
        const mealTypeArray = res?.map((item:any)=>item.mealType)
        const mealTypeSet = new Set(mealTypeArray.flat())            // flat() reduces array nesting by one level
        this.mealTypeList=[...mealTypeSet]
        //allrecipes data
        this.allRecipes=res
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  gotoDetails(id:any){
    if(sessionStorage.getItem('token')){
      this.router.navigateByUrl(`/details/${id}`)
    }
    else{
      alert("Please login first")
    }
  }

}
