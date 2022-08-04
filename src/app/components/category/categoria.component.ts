import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() categoriaSeleccionada = new EventEmitter<Categoria>();
  categorias?:Categoria[];
  

  constructor(private apirest:APIREST,private dataManagment:DataManagment) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  async getCategorias(){  
    this.categorias = await this.dataManagment.getCategorias();
    this.categoriaSeleccionada.emit(this.categorias[0]);
  }

  selectCategory(event:any){
    let categorianombre = event.target.textContent.trim().toLowerCase();
    let category = this.categorias?.find(c => c.name ===categorianombre);
    this.categoriaSeleccionada.emit(category);
  }
}

