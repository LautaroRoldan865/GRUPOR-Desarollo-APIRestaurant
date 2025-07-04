import { Injectable } from "@angular/core";

interface itemDTO{
  name: string; 
  description: string; 
  price : number; 
  imageUrl: string
}

@Injectable({providedIn: 'root'})
export class editService{
    private item: { name: string; description: string; price : number; imageUrl: string} =  {name: "", description: "", price : 0, imageUrl: ""};

    setItem(item: itemDTO ){
        this.item = item;
    }

    getItem(){
        return this.item;
    }
}
