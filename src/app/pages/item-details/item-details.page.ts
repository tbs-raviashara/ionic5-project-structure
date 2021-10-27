import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  quantity: number = 1;
  constructor() { }

  ngOnInit() {
  }

  updateQuantity(val: any) {
    if (val == '-' && this.quantity == 0) {
      return
    }

    if (val == '-') {
      this.quantity--;
    }

    if (val == '+') {
      this.quantity++;
    }
  }
}
