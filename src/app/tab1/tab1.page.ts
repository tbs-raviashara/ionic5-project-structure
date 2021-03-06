import { CallApiService } from './../services/callApi/call-api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public callAPI: CallApiService) {
    // this.callAPI.callSecondAPI();
  }

  toggleDarkTheme(shouldAdd: any) {
    document.body.classList.toggle('dark', shouldAdd.detail.checked);
    document.body.setAttribute('data-theme', shouldAdd.detail.checked ? 'dark' : 'light');
    localStorage.theme = shouldAdd.detail.checked ? 'dark' : 'light';
  }
}
