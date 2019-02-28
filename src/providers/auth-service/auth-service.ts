import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataProvider } from "../data/data";
import 'rxjs/add/operator/map';

//let apiUrl = "https://www.scule-pompe.ro/api/login";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  username: string;
  token: any;

  constructor(public http: HttpClient, public data: DataProvider) {
  }

  postData(apiURL, credentials){

    return new Promise((resolve, reject) =>{

      this.http.post(apiURL, credentials).subscribe((res => {
        resolve(res);
      }), (err =>{
        reject(err);
      }));
    })

  }

  postProducts(apiURL, credentials){

      return new Promise((resolve, reject) => {

        this.http.post(apiURL, credentials).map(res => res).subscribe(res => {
          for (var key in res) {
            if (res.hasOwnProperty(key)) {
              this.data.items.push(res[key]);
              delete this.data.items[''];
            }
          }
          this.data.items.pop();
          resolve(res);

        }, (err) => {
          reject(err);
        });
      })

    }

}
