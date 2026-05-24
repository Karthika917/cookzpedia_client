import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], keyword: string): any[] {
    const recipeList:any[]=value
    value=recipeList.filter((item:any)=>item.name.toLowerCase().includes(keyword.toLowerCase())
    || item.cuisine===keyword || item.mealType.includes(keyword))
    return value;
  }

}
