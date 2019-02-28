import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { DataProvider } from "../../providers/data/data"
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { AlertController } from 'ionic-angular';
import {BasketPage} from "../basket/basket";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  responseData: any;
  i = 0;
  j = 2;
  x = 0;
  y = 2;
  items = [];
  filtereditems = [];
  filteredsearch = [];
  searchTerm: string ='';
  searchControl: FormControl;
  public searching: any = false;
  public ascundecos: boolean = true;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public authService: AuthServiceProvider, public dataService: DataProvider) {

    this.searchControl = new FormControl();

  }


  ionViewDidLoad() {
    this.searchControl.valueChanges.debounceTime(800).subscribe(search => {

      this.searching = false;
      this.setFilteredItems();
    });

    if(this.responseData !== undefined){
      return;
    }
    else{
      this.ascundecos = false;
      this.searching = true;
      const apiURL = "https://www.scule-pompe.ro/api/products";
      let credentials = new FormData();
      credentials.append("username", this.authService.username);
      credentials.append("token", this.authService.token);
      this.authService.postProducts(apiURL, credentials).then((result) => {
        this.responseData = result;
        if(this.responseData.hasOwnProperty('error')){
          this.errorAlert();
          return;
        }
        else {
          this.loadItems();
        }
      });
    }
  }

  loadItems(){
    for (var key in this.dataService.items) {
      if(this.dataService.items.hasOwnProperty(key)) {
        this.items.push(this.dataService.items[key].Product.name);
        this.searching = false;
      }
    }
    for (this.i; this.i < 20; this.i++) {
      this.filtereditems.push(this.items[this.i]);
    }
  }

  doInfinite(infiniteScroll) {
    if(this.searchTerm!==""){
      setTimeout(() => {
        for (this.x; this.x < 20 * this.y; this.x++) {
          if (this.x >= this.filteredsearch.length) {
            break;
          }
          this.filtereditems.push(this.filteredsearch[this.x]);
        }
        this.y++;
        infiniteScroll.complete();
      }, 500);
    }

    if (this.i >= this.items.length){
      infiniteScroll.complete();
    }

    else if (this.searchTerm ===""){

      setTimeout(() => {
        for (this.i; this.i < 20*this.j; this.i++) {
          if (this.i >= this.items.length){
            break;
          }
         this.filtereditems.push(this.items[this.i]);
        }
        this.j++;
        infiniteScroll.complete();
      }, 500);
    }
  }

  onSearchInput(){
    this.searching = true;
  }

  setFilteredItems(){

    if (this.searchTerm===""){
      this.filtereditems.length=0;
      this.i = 0;
      this.j = 2;
      this.loadItems();
    }
    else{
      this.filtereditems.length = 0;
      this.filteredsearch = this.items.filter(item =>{
       return item.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
     });
      this.x = 0;
      for (this.x; this.x < 20; this.x++){
        if(this.filteredsearch[this.x] === undefined){
          break;
        }
        else {
          console.log(this.filteredsearch[this.x]);
          this.filtereditems.push(this.filteredsearch[this.x]);
        }
     }
    }

  }

  addtoBasket(Product){
    this.dataService.addinBasket(Product);
  }

  getBasket(){
    this.navCtrl.push(BasketPage);
  }

  logOut(){
    this.dataService.totalproducts = 0;
    this.dataService.items = [];
    this.dataService.basket = [];
    this.items = [];
    this.filtereditems = [];
    this.responseData = undefined;
    this.navCtrl.setRoot(LoginPage);
  }

  errorAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: this.responseData.error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
