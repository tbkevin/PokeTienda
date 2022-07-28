import { Injectable } from '@angular/core';
import { APIREST } from "./apiREST";
import { Categoria } from '.././classes/category/categoria';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  
export class DataManagment{

    constructor(private apirest:APIREST) { }

    getCategorias():Promise<Categoria[]>{
        return new Promise((resolve, reject)=>{
            this.apirest.getCategorias().subscribe(res =>{
                resolve(res.results);
              });    
        })
    }


}