import { Component, OnInit } from '@angular/core';
import { DISABLED } from '@angular/forms/src/model';
import { async } from 'q';
import { setInterval } from 'timers';
import { Observable } from 'rxjs-observable';
import { Subscription } from "rxjs";
import { interval } from 'rxjs';
import { LoadingController } from '@ionic/angular';

declare var angular: any;



@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
    selectedItem: any;
    icons: string[];
    items: Array<{ title: string, note: string, icon: string }>;

    //allow loading screen to be of any type
    loaderToShow: any;

    //refresh using method call
    doRefresh(event) {
        console.log('Begin async operation');
        location.reload(true);
        /* setTimeout(() => {
             console.log('Async operation has ended');
             event.target.complete();
         }, 2000);*/
    }

    formLoad() {
        this.loaderToShow = this.loadingController.create({
            message: 'Car Standee',
            duration: 3000
        }).then((res) => {
            res.present();
        });
    }

    constructor(public loadingController: LoadingController) {

        //attempt to manually refresh
        const refresh = document.getElementById('refresh');
        if (refresh) {
            refresh.addEventListener('ionRefresh', async(true));
            location.reload(true);
        }

        //declaration of all spot variables for lots
        let libSpot = 8;
        let wesSpot = 10;
        let dunSpot = 3;
        let hofSpot = "45";
        let celSpot = 1;
        let bixSpot = 6;

        // window.onload = function p0() { document.getElementById('p01').innerHTML = '0'; };
        let libString = libSpot.toString();
        var hParams = "?lot=A";
        var lParams = "?lot=B";

        //xhrs for each lot
        var request = new XMLHttpRequest();
        var libraryReq = new XMLHttpRequest();

        var Hoffman = {
            hofSpot: "45",
            timestamp: "Thurs April",
        };



        //    console.log(request.getAllResponseHeaders);
        console.log(request.readyState);
        //    console.log(request.responseText);
        console.log(request.status);
        // var xhr = createCORSRequest('GET', 'https://159.203.181.128:8080/parking-app/main')

        //do not require credentials for the server (bypass SSL)
        request.withCredentials = false;



        //pull and display data when server responds with ready
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                //   interval(10000);

                let data = request.responseText;
                //splitting of spot number and timestamp
                var num = data.split('\n', 2);
                console.log('this is the type of response ' + typeof (request.responseText));

                //split spot data and store number
                let hofSpots = num[0];
                let spotSplit = hofSpots.split('=', 2);
                hofSpots = spotSplit[1];
                //split timestamp data and store only timestamp itself
                let hofTime = num[1];
                let timeSplit = hofTime.split('=', 2);
                hofTime = timeSplit[1];

                //log all data for debgugging
                console.log('hof num ' + num);
                console.log("this is spots type " + typeof (hofSpots));
                console.log("this is time " + typeof (timeSplit));
                console.log("this is hofSpots " + hofSpots);
                console.log("this is timestamp " + timeSplit);
                console.log('hoff response ' + request.responseText);
                console.log('hoff fill ' + data);
                //     hofSpot = hofSpots;
                //only display the number if there is an element in this lot
                if (hofSpots.endsWith('A')) {
                    document.getElementById('p01').innerHTML = 'Not Currently Available';
                }
                else {
                    document.getElementById('p01').innerHTML = hofSpots;
                }
            };
        };

        //possible continual update to the page will use the setInterval function
        /*    function update(){
              request.send();
               let data = request.responseText;
               var num = data.split('\n', 2);
   
               let hofSpots = num[0];
               let spotSplit = hofSpots.split('=', 2);
               hofSpots = spotSplit[1].toString();
               let hofTime = num[1];
               let timeSplit = hofTime.split('=', 2);
               hofTime = timeSplit[1].toString();
   
               console.log(num);
               console.log("this is spots type " + typeof (hofSpots));
               console.log("this is time " + typeof (timeSplit));
               console.log("this is hofSpots " + hofSpots);
               console.log("this is timestamp " + timeSplit);
               console.log(request.responseText);
               console.log(data);
               //     hofSpot = hofSpots;
               document.getElementById('p01').innerHTML = hofSpots;
               
               console.log('im logging the timer');
           };*/

        // setInterval(update, 10000); 

        //function to pull data from server and display it on tab3 if the server responds to be ready
        libraryReq.onreadystatechange = function () {

            if (libraryReq.readyState == 4) {
                let libData = libraryReq.responseText;
                var lnum = libData.split('\n', 2);

                let libSpots = lnum[0];
                let lspotSplit = libSpots.split('=', 2);
                libSpots = lspotSplit[1].toString();
                let libTime = lnum[1];
                let ltimeSplit = libTime.split('=', 2);
                //   libTime = ltimeSplit[1].toString();

                console.log(lnum);
                console.log("this is libSpots " + libSpots);
                console.log("this is lib timestamp " + ltimeSplit);
                console.log('lib reponse ' + libraryReq.responseText);
                console.log('lib spots' + libData);
                //     hofSpot = hofSpots;
                document.getElementById('i0').innerHTML = '6';

            }
        };
        //   update();

        //get requests for multiple parking lots

        request.open('GET', 'http://159.203.181.128:8080/parking-app/main' + hParams, true);
        libraryReq.open('GET', 'http://159.203.181.128:8080/parking-app/main' + lParams, true);

        //open connection to the server for all lots
        request.send();
        libraryReq.send();

        // request.onreadystatechange = function() {

        //if (request.readyState == 4) {
        //     Hoffman.spot = hofSpots;
        //   Hoffman.timestamp = timestamp;
        //   }
        // }
        //  console.log(request.onprogress);
        //console.log(request.responseXML);
        //console.log(request.statusText);
        console.log('server before state' + request.responseText);
        // console.log(request.status);
        //request.onerror = function () {
        //throw (DOMException)
        //};

        if (request.onreadystatechange) {
            console.log(request.onreadystatechange);
            console.log(request.readyState);
        }

        //uncomment when using library lot
        // document.getElementById("library").innerHTML = libString;

        //original display of lots
        var library = { ttile: 'Library', note: 'Spots open: ', spots: libSpot };
        var westside = { ttile: 'Westside', note: 'Spots open: ', spots: wesSpot };
        var dunham = { ttile: 'Dunham', note: 'Spots open: ', spots: dunSpot };
        var celentano = { ttile: 'Celentano', note: 'Spots open: ', spots: celSpot };
        var hoffman = { ttile: 'Hoffman', note: 'Spots open: ', spots: hofSpot };
        var bixler = { ttile: 'Bixler', note: 'Spots open: ', spots: bixSpot };


    }
}