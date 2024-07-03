import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// handle HTTP GET request

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseURL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getWelcomeMessage(): Observable<string> {
    return this.http.get(this.baseURL + '/welcome-message', { responseType: 'text' });
  }

}
