import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  data: any = [];
  constructor() {
    this.data = Array.from({ length: 2000 }, (_, k) => {
      return { name: `name -  ${k + 1}` }
    });
  }

}
