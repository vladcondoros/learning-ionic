import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";

/**
 * Generated class for the BasketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage {

  constructor(public navCtrl: NavController, public dataService: DataProvider) {
  }

  ionViewDidLoad() {
  }

  removefromBasket(Product){
    this.dataService.removefromBasket(Product);
  }

  decrQuantity(Product){
      this.dataService.decrQuantity(Product);
  }

  incrQuantity(Product){
      this.dataService.incrQuantity(Product);
  }

  seeProducts(){
    this.navCtrl.pop();
  }

}
