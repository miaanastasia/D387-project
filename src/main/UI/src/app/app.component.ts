import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { map } from "rxjs/operators";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  // updated 7.2.24 to include app.service.ts
  constructor(private httpClient:HttpClient, private appService: AppService) {}

  private baseURL:string='http://localhost:8080';
  private getUrl:string = this.baseURL + '/room/reservation/v1/';
  private postUrl:string = this.baseURL + '/room/reservation/v1';
  public submitted!:boolean;
  roomsearch! : FormGroup;
  rooms! : Room[];
  request!:ReserveRoomRequest;
  currentCheckInVal!:string;
  currentCheckOutVal!:string;

  // 7.2.24 new property to hold welcome messages
  welcomeMessage: string[] = [];

    ngOnInit(){
      this.roomsearch= new FormGroup({
        checkin: new FormControl(' '),
        checkout: new FormControl(' ')
      });

 //     this.rooms=ROOMS;


    const roomsearchValueChanges$ = this.roomsearch.valueChanges;

    // subscribe to the stream
    roomsearchValueChanges$.subscribe(x => {
      this.currentCheckInVal = x.checkin;
      this.currentCheckOutVal = x.checkout;
    });

    // 7.2.24 fetch welcome messages when component initializes
      this.getWelcomeMessage();


  }
  // 7.8.24 reverted back to original onSubmit() method, attempting to do currency conversion in app.component.html instead
  onSubmit({value,valid}:{value:Roomsearch,valid:boolean}){
    this.getAll().subscribe(

      rooms => {console.log(Object.values(rooms)[0]);this.rooms=<Room[]>Object.values(rooms)[0]; }


    );
  }


  // 7.6.24 updated to get room prices in different currencies
    // 7.7.24 adding logs to resolve issue with submit button TypeError issue
  /*  onSubmit({value,valid}:{value:Roomsearch,valid:boolean}){
      console.log('Form submitted', value, valid);
      if (valid) {
        console.log('Form is valid');
        this.getAll().subscribe(

        /*  response => {
            console.log('Response from server', response);
            if (Array.isArray(response)) {
              this.rooms = response.map((room: Room) => this.addEstimatedPrices(room));
              console.log('Rooms fetched', this.rooms);
            } else {
              console.error('Unexpected response format', response);
              if (response && response.data && Array.isArray(response.data)) {
                this.rooms = response.data.map((room: Room) => this.addEstimatedPrices(room));
                console.log('Rooms fetched', this.rooms);
              }
            }
          },

         */

      /*    response => {
            console.log('Response from server', response);
            let roomsArray: any[] = [];

            if (Array.isArray(response)) {
              roomsArray = response;
            } else if (response && response.content && Array.isArray(response.content)) {
              roomsArray = response.content;
            }

            if (roomsArray.length > 0) {
              this.rooms = roomsArray.map((room: Room) => this.addEstimatedPrices(room));
              console.log('Rooms fetched', this.rooms);
            } else {
              console.error('Unexpected response format or empty array:', response);
            }

          },


          error => {
            console.error('Error fetching rooms', error);
          }

        );
      } else {
        console.log('Form is invalid');
      }

    }
    */
    reserveRoom(value:string){
      this.request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);

      this.createReservation(this.request);
    }

    createReservation(body:ReserveRoomRequest) {
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
     // let options = new RequestOptions({headers: headers}); // Create a request option

     const options = {
      headers: new HttpHeaders().append('key', 'value'),

    }

      this.httpClient.post(this.postUrl, body, options)
        .subscribe(res => console.log(res));
    }

  mapRoom(response:HttpResponse<any>): Room[]{
    return response.body;
  }

  // 7.6.24 addressing issue that room implicitly has 'any' type
/*  getAll(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.baseURL + '/room/reservation/v1?checkin=' + this.currentCheckInVal + '&checkout=' + this.currentCheckOutVal, {responseType: 'json'});
  }

 */


    getAll(): Observable<any> {
       return this.httpClient.get(this.baseURL + '/room/reservation/v1?checkin='+ this.currentCheckInVal + '&checkout='+this.currentCheckOutVal, {responseType: 'json'});
    }


    // 7.2.24 implement method to fetch welcome messages
    // 7.4.24 added logging
    getWelcomeMessage() {
      this.appService.getWelcomeMessage().subscribe(
        data => {
          console.log('Welcome msg fetched successfully', data);
          this.welcomeMessage = data;
        },
        error =>  {
          console.error('Error fetching welcome messages', error)
        }
      );
    }

  // 7.6.24 adding prices in CAD and EUR
  private addEstimatedPrices(room: Room): Room {
    const priceUSD = parseFloat(room.price);
    room.priceCAD = (priceUSD * 1.3).toFixed(2);
    room.priceEUR = (priceUSD * 0.9).toFixed(2);
    return room;
  }

  }


export interface Roomsearch{
    checkin:string;
    checkout:string;
  }




export interface Room{
  id:string;
  roomNumber:string;
  price:string;
  priceCAD?:string;
  priceEUR?:string;
  links:string;

}
export class ReserveRoomRequest {
  roomId:string;
  checkin:string;
  checkout:string;

  constructor(roomId:string,
              checkin:string,
              checkout:string) {

    this.roomId = roomId;
    this.checkin = checkin;
    this.checkout = checkout;
  }
}


/*var ROOMS: Room[]=[
  {
  "id": "13932123",
  "roomNumber" : "409",
  "price" :"20",
  "links" : ""
},
{
  "id": "139324444",
  "roomNumber" : "509",
  "price" :"30",
  "links" : ""
},
{
  "id": "139324888",
  "roomNumber" : "609",
  "price" :"40",
  "links" : ""
}
]
*/
