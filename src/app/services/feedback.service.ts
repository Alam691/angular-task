import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _http: HttpClient) { }

  addFeedback(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/feedback', data);
  }

  getFeedbackList(): Observable<any> {
    return this._http.get('http://localhost:3000/feedback');
  }

}
