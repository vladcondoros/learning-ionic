import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  items = [];
  basket = [];
  totalproducts = 0;

  constructor(public http: HttpClient) {
  }

  addinBasket(produs) {

    let c = this.basket.find(x => x.product === produs);

    if(c == null){
      this.basket.push({product: produs, quantity: 1});
      this.totalproducts++;
    }
    else {
      c.quantity++;
      this.totalproducts++;
    }

  }

  incrQuantity(produs) {
    produs.quantity++;
    this.totalproducts++;
  }

  decrQuantity(produs){
    if(produs.quantity === 1){
      let x = this.basket.indexOf(produs);
      this.basket.splice(x, 1);
      this.totalproducts--;
    }
    else{
    produs.quantity--;
    this.totalproducts--;
    }
  }

  removefromBasket(produs){

      this.totalproducts = this.totalproducts - produs.quantity;
      produs.quantity = 0;
      let x = this.basket.indexOf(produs);
      this.basket.splice(x, 1);

  }

  filterItems(searchTerm){

    return this.items.filter(item =>{
        return item.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

}
