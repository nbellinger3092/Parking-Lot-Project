import { Component} from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { Tab3Page } from '../tab3/tab3.page';
import { NavController } from '@ionic/angular';
import { NavComponent } from '@ionic/core';

declare var angular: any;
/*
var toggleCheck = angular.module('park-smart', []);
toggleCheck.controller('toggling',['$scope',function($scope) {
    boolean $scope.isToggled;
}]);
*/

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    public toggles: number[] = [0, 0, 0, 0, 0, 0, 0];

    public isToggled: boolean;
    //will update when called from the document. One for each lot. Will filter
    updateCelentano(toggles) {       
        document.getElementById("cel");
        if (toggles[0] == 0 && toggles[1] == 0 && toggles[2] == 0 && toggles[3] == 0 && toggles[4] == 0 && toggles[5] == 0 && toggles[6] == 0) {
            //  if (toggles[0] == 0) {
            toggles[0] = 1;
            console.log('celentano is now checked' + toggles[0]);
        }
        else {
            toggles[0] = 0;
            console.log('celentano is now unchecked');
        }
    };

    checkNone(toggles) {
        return toggles == 0;
    }
    passResident() {
      //  this.navCtrl.push(Tab3Page, )
    };    
      
    doRefresh(event) {
        console.log('Begin async operation');
        location.reload(true);
        /* setTimeout(() => {
             console.log('Async operation has ended');
             event.target.complete();
         }, 2000);*/
    }
    constructor(public navCtrl: NavController) {
        
       
        console.log(typeof (this.toggles[0]));
      
   /* function checkNone(toggles) {
        return toggles == 0;
        }
        */
        var commute = document.getElementById('commute');
        console.log('type of commute ' + typeof (commute));
       // commute.addEventListener('change', updateCelentano);
   // document.getElementById(commute);
}
}
