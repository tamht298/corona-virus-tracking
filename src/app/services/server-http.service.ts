import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerHttpService {

  private httpOptions = {
    headers: new HttpHeaders({})
  };
  private baseUrl = 'https://api.covid19api.com';
  constructor(private http: HttpClient) { }
  
  public getALL(): Observable<any>{
    return this.http.get<any>(this.baseUrl, this.httpOptions);
  }

  public getSummary(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/summary`, this.httpOptions);
  }

}
