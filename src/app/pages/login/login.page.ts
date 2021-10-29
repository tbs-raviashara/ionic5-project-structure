import { apiMethod } from 'src/app/constants/constants';
import { CallApiService } from './../../services/callApi/call-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public callAPI: CallApiService) { }

  ngOnInit() {
  }

}
