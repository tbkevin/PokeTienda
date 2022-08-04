import { Injectable } from '@angular/core';
import { ProductSmall, CartProduct } from '../classes/product/product'
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class UtilsServices {

    localStore = false;
    cartShoppingProduct: CartProduct[] = [];

    constructor(private router: Router) {
    }


    public addProductToShoppingCart(product: CartProduct) {
        if (this.cartShoppingProduct.length === 0) {
            this.cartShoppingProduct.push(product);
        } else {
            let sameProduct = this.cartShoppingProduct.find(p => { return p.product.name === product.product.name });
            if (sameProduct === undefined) {
                this.cartShoppingProduct.push(product);
            } else {
                sameProduct.amount += product.amount;
            }
        }
        this.router.navigateByUrl('/shoppingcart');
    }

    public computeFinalPrice(): number {
        let acum: number = 0;
        this.cartShoppingProduct.forEach(cp => {
            acum += cp.amount * cp.product.cost
        });
        return acum;
    }

    public cleanShoppingCart(): void {
        this.cartShoppingProduct = [];
    }

    public deleteElement(element: CartProduct): void {
        const indexOfElement = this.cartShoppingProduct.findIndex(ct => {
            return element.product.name.toLocaleLowerCase() === ct.product.name.toLocaleLowerCase();
        });
        this.cartShoppingProduct.splice(indexOfElement, 1);

    }

}