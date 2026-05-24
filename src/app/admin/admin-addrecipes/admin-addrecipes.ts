import { Component } from '@angular/core';
import { Recipe } from '../models/recipe-model';
import { Api } from '../../Service/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-addrecipes',
  standalone: false,
  templateUrl: './admin-addrecipes.html',
  styleUrl: './admin-addrecipes.css',
})
export class AdminAddrecipes {

  recipeDetails:Recipe={}

  selectedIngredients:any[]=[]

  selectedInstructions:any[]=[]

  mealTypes:any[]=[]

  selectedMealTypes:any[]=[]

  recipeId:string=""

  constructor(private api:Api, private router:Router, private ar:ActivatedRoute){}

  ngOnInit(){
    this.ar.params.subscribe((res:any)=>{
      this.recipeId = res.id
    })
    this.getMealTypeData()
  }

    getMealTypeData(){
      this.api.getAllRecipesApi().subscribe((res:any)=>{

        if(this.recipeId){
          this.recipeDetails= res.find((item:any)=>item._id==this.recipeId)
          this.selectedIngredients=this.recipeDetails.ingredients||[]
          this.selectedInstructions=this.recipeDetails.instructions||[]
          this.selectedMealTypes=this.recipeDetails.mealType||[]
        }
      const mt = res.map((item:any)=>item.mealType)
      const mealTypeSet = new Set(mt.flat(Infinity))
      this.mealTypes=[...mealTypeSet]
    })
  }
    
    

  addSelectedIngredients(inp:any){
     if(inp.value.length > 0){
       this.selectedIngredients.push(inp.value)
       inp.value = ""
       }
  }

  deleteSelectedIngredient(val:string){
     this.selectedIngredients=this.selectedIngredients.filter((item:any)=>item!=val)
  }

  addSelectedInstructions(inp:any){
    if(inp.value.length > 0){
       this.selectedInstructions.push(inp.value)
       inp.value = ""
    }
  }
 
  deleteSelectedInstruction(val:string){
     this.selectedInstructions=this.selectedInstructions.filter((item:any)=>item!=val)
  }

  chooseMeal(mealCheckedEvent:any){
      if(mealCheckedEvent.target.checked){
         !this.selectedMealTypes.includes(mealCheckedEvent.target.name) && this.selectedMealTypes.push(mealCheckedEvent.target.name)
       }
       else{
        this.selectedMealTypes = this.selectedMealTypes.filter((item:any)=>item!=mealCheckedEvent.target.name)
       }
       console.log(this.selectedMealTypes)
  }

  handleAddRecipe(){
    this.recipeDetails.ingredients=this.selectedIngredients
    this.recipeDetails.instructions=this.selectedInstructions
    this.recipeDetails.mealType=this.selectedMealTypes

    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,
      difficulty,image,mealType,cuisine, caloriesPerServing} = this.recipeDetails

      if(name && ingredients && instructions && prepTimeMinutes && cookTimeMinutes && servings &&
      difficulty && image && mealType && cuisine && caloriesPerServing){
        // api call
        this.api.addRecipeApi(this.recipeDetails).subscribe({
          next:(res:any)=>{
            alert("Recipe added")
            this.router.navigateByUrl('/admin/recipes')
          },
          error:(err:any)=>{
            alert("Something went wrong")
            err.error?alert(err.error):
            console.log(err)
          }
        })
      }
      else{
        alert("Enter Valid Inputs!!")
      }
  }

  removeMealType(mt:string){
    this.selectedMealTypes=this.selectedMealTypes.filter((item:any)=>item!=mt)
  }

  handleEditRecipe() {
    this.recipeDetails.ingredients = this.selectedIngredients
    this.recipeDetails.instructions = this.selectedInstructions;
    this.recipeDetails.mealType = this.selectedMealTypes;

    const {
      name,
      ingredients,
      instructions,
      prepTimeMinutes,
      cookTimeMinutes,
      servings,
      difficulty,
      image,
      mealType,
      cuisine,
      caloriesPerServing,
    } = this.recipeDetails;

    if (
      name &&
      ingredients &&
      instructions &&
      prepTimeMinutes &&
      cookTimeMinutes &&
      servings &&
      difficulty &&
      image &&
      mealType &&
      cuisine &&
      caloriesPerServing
    ) {
      // api call
      this.api.editRecipeApi(this.recipeId,this.recipeDetails).subscribe({
        next: (res: any) => {
          alert('Recipe Updated!!');
          this.router.navigateByUrl('/admin/recipes');
        },

        error: (err: any) => {
          alert('Something went wrong');
          err.error ? alert(err.error) : console.log(err);
        },
      });
    } else {
      alert('Enter Valid Inputs!!');
    }
  }


  
}
