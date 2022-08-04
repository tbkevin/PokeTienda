import { Component, OnInit } from '@angular/core';
import { UtilsServices } from 'src/app/services/utilsServices';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CartProduct } from 'src/app/classes/product/product';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-shoppingcart',
  templateUrl: '../../pages/ShoppingCart/shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  displayedColumns: string[] = ['id','img','nombre', 'cost','amount','total','accion'];
  dataSource = new MatTableDataSource<CartProduct>();

  constructor(private utilsService:UtilsServices,private _snackBar: MatSnackBar) { }

  get shoppingCart(){
    return this.utilsService.cartShoppingProduct;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<CartProduct>(this.shoppingCart);
  }

  get totalPrice(){
    return this.utilsService.computeFinalPrice();
  }

  makePayment(){
    this._snackBar.open("The payment was made successfully",'',{
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition : "bottom"
    });
    this.utilsService.cleanShoppingCart();
  }

  deleteElement(element:CartProduct){
    this.utilsService.deleteElement(element);
    this.dataSource.data = this.shoppingCart;
  }

}
