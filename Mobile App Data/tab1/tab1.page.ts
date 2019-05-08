import { Component , OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, Tooltip } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { Chart } from 'chart.js';
//import * as mysql from 'mysql';
import { Http } from '@angular/http';
import { ModalController } from '@ionic/angular';
//import { mysqli } from 'mysql';
//import { tab3 } from 'tabs/tab3';
//import 'rxjs/add/operator/map';
//import { Observable } from 'rxjs/Observable';


declare var require: any;
@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
@Component({
        selector: 'app-bar-chart',
})
export class Tab1Page {
    @ViewChild('lineCanvas') lineCanvas;
    @ViewChild('barCanvas') barCanvas;
    @ViewChild('chartContainer') chartcontainer: ElementRef;
    @ViewChild('monChar') monChar: ElementRef;
    @ViewChild('weekChar') weekChar: ElementRef;

    barChart: any;
    
    weekChart: Chart;
    monChart: Chart;
    ngAfterViewInit() {

        this.createWeekChart();
        this.createMonChart();
  }
    //definitions for the bar chart
    public barHourly: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
   

    //declaration of chart variables
    public avgMon: number[] = [24, 20, 18, 23, 20, 12, 13, 13, 10, 8, 4, 9, 12, 16, 16, 18, 20, 20, 21, 23, 26, 26, 28, 29, 42 ];
    public hourLabel: string[] = ['8 AM', '8:30 AM', '9 AM', '9:30 AM', '10 AM', '10:30 AM', '11 AM', '11:30 AM', '12 PM', '12:30 PM', '1 PM', '1:30 PM', '2 PM', '2:30 PM', '3 PM', '3:30 PM', '4 PM', '4:30 PM', '5 PM', '5:30 PM', '6 PM', '6:30 PM', '7 PM', '7:30 PM', '8 PM'];
    public barHourlyLabel: string[] = ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'];
    public barHourlyType: ChartType = 'bar';
    public type: string = 'line';
    public Legend: Boolean = true;
    public barHourlyPlugins = [pluginDataLabels];
    public barChartOptions: ChartOptions = {
        responsive: true,

        
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        }
    }; 

    


    createWeekChart() {
        Chart.defaults.global.defaultFontFamily = 'Muller-Light';

        //creation of chartjs chart for week statistics
        this.weekChart = new Chart(this.weekChar.nativeElement, {
            type: 'line',
            
            data: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                datasets: [{
                    label: '# of Spots Open',
                    data: [12, 19, 3, 5, 23],
                    backgroundColor: [
                        'rgba(255, 215, 0,0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 215, 0,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    labels: {
                        fontFamily: 'Muller-Light',
                        fontSize: 15
                       

                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                layout: {
                    padding: {
                        left: 20,
                        right: 20,
                        top: 20,
                        bottom: 20
                    }
                },
               
            }
        });
    }
    createMonChart() {
        Chart.defaults.global.defaultFontFamily = 'Muller-Light';

        //creation of chartjs chart for monday statistics
        this.monChart = new Chart(this.monChar.nativeElement, {
            type: 'line',

            data: {
                labels: this.hourLabel,
                datasets: [{
                    label: '# of Spots Open',
                    data: this.avgMon,
                        //                        [12, 19, 3, 5, 2],
                    backgroundColor: [
                        'rgba(255, 215, 0,0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 215, 0,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    labels: {
                        fontFamily: 'Muller-Light',
                        fontSize: 15


                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                layout: {
                    padding: {
                        left: 20,
                        right: 20,
                        top: 20,
                        bottom: 20
                    }
                },

            }
        });

    }
    public repo: any;

    //refresh on pulldown in page
    doRefresh(event) {
        console.log('Begin async operation');
        location.reload(true);
        /* setTimeout(() => {
             console.log('Async operation has ended');
             event.target.complete();
         }, 2000);*/
    }
    constructor(public http:Http) {
        var database = new XMLHttpRequest();
       
       // this.database();
       

      /* database.open('GET', '192.81.218.39', true, 'backend', '1234!');
        console.log('database ready state ' + database.readyState);
        
        database.onreadystatechange = function () {
            if (database.readyState == 4) {
                console.log(database.response);
            }
        };

        database.send();*/
        
        // code Jen sent for the database
    
        //   var mysql = require('mysql');
    
    /*        var con = mysql.createConnection({
                host: "192.81.218.39",
                user: "backend",
                password: "1234!",
                database: "parkingLot"
            });
    
            con.connect(function (err) {
                if (err) throw err;
                con.query("SELECT * FROM trafficTracking", function (err, result, fields) {
                    if (err) throw err;
                    console.log(result);
                });
            });*/
     
   
   
    }
  //  ngOnInit() {
     //   this.database();
    //}
    //connection to mySQL daatabase on didgital ocean droplet
  /*  database() {
       this.http
           .get('http://192.81.218.39/root/api/openDB.php')           
           .subscribe((data: any) => {
               console.log(data);
               console.log(typeof (data));
           }
       )
            };*/
    }