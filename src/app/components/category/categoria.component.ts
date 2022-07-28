import { Component, OnInit } from '@angular/core';
import { APIREST } from '../../services/apiREST';
import { Categoria } from '../../classes/category/categoria';
import { DataManagment } from "../../services/dataManagment";
import { Observable,of, take } from 'rxjs';

@Component({
  selector: 'app-categoria',
  templateUrl: '../../pages/Home/categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  public categoriaSeleccionada?:Categoria;
  public categorias?:Categoria[];
  

  constructor(private apirest:APIREST,private dataManagment:DataManagment) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  async getCategorias(){  
    this.categorias = await this.dataManagment.getCategorias();
    this.categoriaSeleccionada = this.categorias[0];
  }

  selectCategory(event:any){
    this.categoriaSeleccionada = event.target.textContent.trim();
    console.log(this.categoriaSeleccionada);
    
  }
}

