import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/classes/category/categoria';
import { DataManagment } from 'src/app/services/dataManagment';
import { ItemResult } from "src/app/classes/product/productsCategory";
import { ProductSmall, CartProduct } from 'src/app/classes/product/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UtilsServices } from 'src/app/services/utilsServices';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-tienda',
  templateUrl: '../../pages/home/store.component.html',
  styleUrls: ['./store.component.css']
})
export class TiendaComponent implements OnInit {

  category: Categoria = { name: "", url: "" };
  products: ProductSmall[] = [];
  displayedColumns: string[] = ['id', 'img', 'nombre', 'cost', 'acciones'];
  dataSource = new MatTableDataSource<any>();
  cargado = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;

  constructor(private dataManagment: DataManagment, private utilsService: UtilsServices) { }

  ngOnInit(): void {
  }

  selectedCategory(categoria: Categoria) {
    this.category = Object.assign({}, categoria);
    this.getProductsurls();
  }

  async getProductsurls() {
    let itemResults = await this.dataManagment.getProductsbyCategory(this.category.url);
    this.products = [];
    this.filterInput.nativeElement.value = '';
    this.displayProducts(itemResults);
  }

  async displayProducts(itemResults: ItemResult[]) {

    let listproducts: ProductSmall[] = [];
    for (const ir of itemResults) {

      listproducts.push(await this.dataManagment.getProductDetails(ir.url))
    }
    this.products = listproducts;
    this.cargado = true;
    this.dataSource = new MatTableDataSource<ProductSmall>(this.products);
    this.dataSource.paginator = this.paginator;
    this.filterTable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  cart(product: ProductSmall, amount: HTMLInputElement) {
    const value = amount.value;
    if (value === "" || Number(value) < 1) {
      amount.value = "1";
      return;
    }
    const cartProduct = new CartProduct(product, Number(value));
    this.utilsService.addProductToShoppingCart(cartProduct);
  }

  filterTable() {
    this.dataSource.filterPredicate = (data: ProductSmall, filter: string): boolean => {
      return (data.name.toLocaleLowerCase().includes(filter));
    }
  }

}
