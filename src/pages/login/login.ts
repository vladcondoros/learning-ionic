import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DataProvider } from '../../providers/data/data';
import { WelcomePage } from '../welcome/welcome';
import 'rxjs/add/operator/debounceTime';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  responseData : any;
  public userData = {"username":"", "password":""};
  remember: boolean;

  constructor(private storage: Storage, private alertCtrl: AlertController, public navCtrl: NavController, public authService: AuthServiceProvider, public dataService: DataProvider) {



  }

  ionViewDidLoad() {
    if(this.storage.length !== null){
      this.storage.get('username').then(value => {
        this.userData.username = value;
      });
      this.storage.get('password').then(value => {
        this.userData.password = value;
      });
    }
  }


  login(){
    const apiURL = "https://www.scule-pompe.ro/api/login";
    let credentials = new FormData();
    credentials.append("username", this.userData.username);
    this.authService.username = this.userData.username;
    credentials.append("password", this.userData.password);

    if(!this.validatepass() || !this.validateuser()){
      return;
    }
    else{
      this.authService.postData(apiURL, credentials).then((res) =>{
        this.responseData = res;
        if(this.responseData.hasOwnProperty('error')){
          this.errorAlert();
          return;
        }
        else{
          if(this.remember === true){
            this.storage.set('username', this.userData.username);
            this.storage.set('password', this.userData.password);
          }
          else{
            if(this.remember === false){
              this.userData.username = "";
              this.userData.password = "";
            }
          }
          this.authService.token = this.responseData.token;
          this.navCtrl.setRoot(WelcomePage);
        }
      });
    }
    if (this.isogram(this.userData.username)) {
      alert("word is isogram");
    }
      else{
        alert("word is not isogram");
      }
  }

  errorAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: this.responseData.error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  validateuser(){
    if (this.userData.username.match(" ")){
      this.alertCtrl.create({
        title: 'Error',
        subTitle:"Username-ul nu poate să conţină spaţiu liber",
        buttons: ['Dismiss']
      }).present();
      return false;
    }
    else{
      return true;
    }
  }

  validatepass(){
    if (this.userData.password.match(" ")){
      this.alertCtrl.create({
        title: 'Error',
        subTitle:"Parola nu poate să conţină spaţiu liber",
        buttons: ['Dismiss']
      }).present();
      return false;
    }
    else{
      return true;
    }
  }

  isogram(word){
    word = word.toLowerCase();

    var counter = {};

    for(let i = 0; i <= word.length-1; i++){
      var letter = word.charAt(i);
        if(counter[letter]){
          counter[letter] = 1 + counter[letter];
        }
        else{
          counter[letter] = 1;
        }
        if(counter[letter] > 1){
          return false;
        }
    }
    return true;
  }

}
