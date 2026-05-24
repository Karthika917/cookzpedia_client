import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsers } from './admin-users/admin-users';
import { AdminAddrecipes } from './admin-addrecipes/admin-addrecipes';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminFeedbacks } from './admin-feedbacks/admin-feedbacks';
import { AdminRecipelist } from './admin-recipelist/admin-recipelist';


const routes: Routes = [
  {path:'',component:AdminDashboard,title:'Admin-Dashboard'},
  {path:'recipes',component:AdminRecipelist,title:'Admin-RecipeList'},
  {path:'add-recipe',component:AdminAddrecipes,title:'Admin-AddRecipe'},
  {path:'users',component:AdminUsers,title:'Admin-Users'},
  {path:'feedbacks',component:AdminFeedbacks,title:'Admin-Feedbacks'},
  {path:'edit-recipe/:id',component:AdminAddrecipes,title:'Admin-EditRecipe'}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
