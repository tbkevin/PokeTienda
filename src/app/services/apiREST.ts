import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultadoCategorias } from '../classes/category/categoria';
import { Observable, tap } from 'rxjs';
import { AbstractWebService } from './abstractWebService';

@Injectable({
  providedIn: 'root'
})

export class APIREST extends AbstractWebService {
  pokeapiurl:string = "https://pokeapi.co/api/v2"
  
  constructor(private hhtp:HttpClient) {
    super(hhtp);
  }


  getCategorias():Observable<ResultadoCategorias>{
    return this.makeGet<ResultadoCategorias>(`${this.pokeapiurl}/item-attribute`);
  }

}


