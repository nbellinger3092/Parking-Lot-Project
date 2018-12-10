import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
   
    let i=0;
    if (i == 0) {
      this.items.push({
        title: 'Library',
        note: 'Currently has ' + 15 + ' spots',
        icon: 'car'
        
      });
      i++;
    }
    if (i == 1) {
      this.items.push({
        title: 'Westside',
        note: 'Currently has ' + 10 + ' spots',
        icon: 'car'
      });
      i++;
    }
    if (i == 2) {
      this.items.push({
        title: 'Dunham',
        note: 'Currently has ' + 3 + ' spots',
        icon: 'car'
      });
      i++;
    }
    if (i == 3) {
      this.items.push({
        title: 'Celentano',
        note: 'Currently has ' + 1 + ' spots',
        icon: 'car'
      });
      i++;
    }
    if (i == 4) {
      this.items.push({
        title: 'Bergami',
        note: 'Currently has ' + 5 + ' spots',
        icon: 'car'
      });
      i++;
    }
    if (i == 5) {
      this.items.push({
        title: 'North',
        note: 'Currently has ' + 25 + ' spots',
        icon: 'car'
      });
      i++;
    }
    if (i == 6) {
      this.items.push({
        title: 'Bixler',
        note: 'Currently has ' + 2 + ' spots',
        icon: 'car'
      });
      i++;
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Page2, {
      item: item
    });
  }
}
