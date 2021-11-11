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

  /**
   * @param {string} method get/post/delete/put
   * @param {string} url End-Point Name
   * @param {*} params Post method parameters
   * @param {*} successCallBack CallBack
   * @param {*} errorCallBack CallBack
   * @memberof CallApiService
   */
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

  /**
   * @param {string} header Alert Header // Default 'Demo'
   * @param {string} message Alert Message
   * @param {string} [buttonName] Button Name // Default 'Okay'
   * @memberof CallApiService
   */
  showAlert(header: string, message: string, buttonName?: string) {
    this.alertController.create({
      header: header || 'Demo',
      message: message,
      buttons: buttonName ? [buttonName] : ['Okay']
    }).then((alert: any) => {
      alert.present();
    });
  }

  /**
   * @param {string} header Confirm Header // Default 'Demo'
   * @param {string} message Confirm Message
   * @param {*} [buttonName] Button Name // Default 'Okay' and 'Cancel'
   * @param {*} [callBack] CallBack
   * @memberof CallApiService
   */
  showConfirm(header: string, message: string, buttonName?: any, callBack?: any) {
    this.alertController.create({
      header: header || 'Demo',
      message: message,
      buttons: [
        {
          text: buttonName ? buttonName[0] : 'Cancel',
          role: 'cancel',
          handler: () => {
            callBack(false);
          }
        }, {
          text: buttonName ? buttonName[1] : 'Okay',
          handler: () => {
            callBack(true);
          }
        }
      ]
    }).then((confirm: any) => {
      confirm.present();
    });
  }

  /**
   * @param {string} message Toast Message
   * @param {*} [position] "top" | "bottom" | "middle" // default top
   * @param {number} [duration] default 2500
   * @memberof CallApiService
   */
  showToast(message: string, position?: any, duration?: number) {
    this.toastController.create({
      message: message,
      position: position || 'top',
      duration: duration || 2500
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
