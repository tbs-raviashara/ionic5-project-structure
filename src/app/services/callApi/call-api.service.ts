import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { apiMethod } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  constructor(public loadingController: LoadingController, public toastController: ToastController, public alertController: AlertController, public navController: NavController, public httpClient: HttpClient, public router: Router, public ngZone: NgZone, public platForm: Platform) { }

  apiCall(method: string, url: string, params: any, successCallBack: any, errorCallBack: any) {
    if (method == apiMethod.get) {
      this.httpClient.get(url).subscribe((response: any) => {
        successCallBack(response);
      }, (error: any) => {
        errorCallBack(error);
      });
    }

    if (method == apiMethod.post) {
      this.httpClient.post(url, params).subscribe((response: any) => {
        successCallBack(response);
      }, (error: any) => {
        errorCallBack(error);
      });
    }

    if (method == apiMethod.put) {
      this.httpClient.put(url, params).subscribe((response: any) => {
        successCallBack(response);
      }, (error: any) => {
        errorCallBack(error);
      });
    }

    if (method == apiMethod.delete) {
      this.httpClient.delete(url).subscribe((response: any) => {
        successCallBack(response);
      }, (error: any) => {
        errorCallBack(error);
      });
    }
  }

  refreshToken() {
    let loginParams = {
      grant_type: '',
      username: '',
      password: '',
    };

    return this.httpClient.post('url', this.getJsonString(loginParams));
  }

  showAlert(header: string, message: string, buttonName: string) {
    this.alertController.create({
      header: header || 'Demo',
      message: message,
      buttons: [buttonName]
    }).then((alert: any) => {
      alert.present();
    });
  }

  showConfirm(header: string, message: string, buttonName: any, callBack: any) {
    this.alertController.create({
      header: header || 'Demo',
      message: message,
      buttons: [
        {
          text: buttonName[0],
          role: 'cancel',
          handler: () => {
            callBack(false);
          }
        }, {
          text: buttonName[0],
          handler: () => {
            callBack(true);
          }
        }
      ]
    }).then((confirm: any) => {
      confirm.present();
    });
  }

  showToast(message: string, position: any, duration: number) {
    this.toastController.create({
      message: message,
      position: position,
      duration: duration
    }).then((toast: any) => {
      toast.present();
    });
  }

  showLoader() {
    this.loadingController.create({
      backdropDismiss: true,
      message: 'Please wait...',
    }).then((loader: any) => {
      loader.present();
    });
  }

  hideLoader() {
    this.loadingController.dismiss();
  }

  getJsonString(params: any) {
    let formBody: any = [];
    for (const property in params) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return (formBody = formBody.join('&'));
  }

  clickLogin() {
    let loginParams = {
      grant_type: '',
      username: '',
      password: '',
    };
    this.apiCall(apiMethod.post, 'url', this.getJsonString(loginParams), (success: any) => {
      localStorage.token = success.access_token;
    }, (error: any) => {
      console.log(error);
    });
  }

  callSecondAPI() {
    this.apiCall(apiMethod.get, 'url', '', (success: any) => {
      console.log(success, 'success');
    }, (error: any) => {
      console.log(error);
    });
  }
}
