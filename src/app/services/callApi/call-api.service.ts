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
        if (error.statusText === "Unauthorized") {
          this.refreshToken((callBack: any) => {
            if (callBack) {
              this.apiCall(method, url, params, successCallBack, errorCallBack);
            }
          });
        } else {
          errorCallBack(error);
          this.handleError(error);
        }
      });
    }

    if (method == apiMethod.post) {
      this.httpClient.post(url, params).subscribe((response: any) => {
        successCallBack(response);
      }, (error: any) => {
        if (error.statusText === "Unauthorized") {
          this.refreshToken((callBack: any) => {
            if (callBack) {
              this.apiCall(method, url, params, successCallBack, errorCallBack);
            }
          });
        } else {
          errorCallBack(error);
          this.handleError(error);
        }
      });
    }

    if (method == apiMethod.put) {
      this.httpClient.put(url, params).subscribe((response: any) => {
        successCallBack(response);
      }, (error: any) => {
        if (error.statusText === "Unauthorized") {
          this.refreshToken((callBack: any) => {
            if (callBack) {
              this.apiCall(method, url, params, successCallBack, errorCallBack);
            }
          });
        } else {
          errorCallBack(error);
          this.handleError(error);
        }
      });
    }

    if (method == apiMethod.delete) {
      this.httpClient.delete(url).subscribe((response: any) => {
        successCallBack(response);
      }, (error: any) => {
        if (error.statusText === "Unauthorized") {
          this.refreshToken((callBack: any) => {
            if (callBack) {
              this.apiCall(method, url, params, successCallBack, errorCallBack);
            }
          });
        } else {
          errorCallBack(error);
          this.handleError(error);
        }
      });
    }
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  refreshToken(callBack: any) {
    this.apiCall('', '', '', (isSuccess: any) => {
      callBack(true);
    }, (isError: any) => {
      callBack(false);
    });
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
}
