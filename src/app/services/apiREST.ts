import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultadoCategorias } from '../classes/category/categoria';
import { Observable, tap } from 'rxjs';
import { AbstractWebService } from './abstractWebService';
import * as interfaceProductCategory from '../classes/product/productsCategory'
import {RootObject} from '../classes/product/productsCategory'
import { ProductBig } from '../classes/product/product';
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

  getProductsbyCategory(url:string):Observable<RootObject>{
    return this.makeGet<RootObject>(url);
  }

  getProductDetails(url:string):Observable<ProductBig>{
    return this.makeGet<ProductBig>(url);
  }
}


