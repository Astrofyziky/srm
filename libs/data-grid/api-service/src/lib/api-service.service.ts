import { KeyValue } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { environment } from '../../../../';
// import { environment } from 'projects/texting/src/environments/environment';
import { from, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'any'
})
export class ApiServiceService {

  private credentialValue = false;
  private localHost = '';

  constructor(private http: HttpClient) { 
    this.credentialValue = true;
    this.localHost = 'http://localhost:4567';

    // if(!environment.production) {
      
    // }
  }

  public Get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.localHost + url, { withCredentials: this.credentialValue });
  }

  public GetSampleData(url: string): Observable<any[]> {
    //return this.http.get<T>(this.localHost + url, { withCredentials: this.credentialValue });
    const f: Array<any> = [];

    
    for(let i = 1; i <= 50; i++) {
      for(let j = 1; j <= 100; j++) {
        f.push({
          firstName: `First ${i}`,
          lastName: `Last ${i}${j}`,
          phone: `Phone ${i}`,
          address: `Address ${i}`,
          state: `State ${i}`,
          zip: i*j,
        });
      }
    }
    const o = of(f);
  
    return o;
  }

  public GetWithParams<T>(url: string, params: Array<KeyValue<string,string>>): Observable<T> {
    const param = new HttpParams();

    params.forEach(x => {
      param.set(x.key, x.value);
    })

    return this.http.get<T>(this.localHost + url, {
      params: param,
      withCredentials: this.credentialValue,
      headers: new HttpHeaders({
        ////'Content-Type':  'application/json'
        //'Content-Type':  'application/x-www-form-urlencoded'
      }),
    });
  }

  public Post<T>(url: string, data: T): Observable<any> {
    return this.http.post<T>(this.localHost + url, data, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8'
        //'Content-Type':  'application/x-www-form-urlencoded;text/plain;multipart/form-data'
      }),
      withCredentials: true,
      //params: new HttpParams().set('campaignId',data.toString())
    });
  }

  public PostWithHeaders(url: string, params: Array<KeyValue<string,string>>): Observable<any> {
    const param = new HttpParams();

    params.forEach(x => {
      param.set(x.key, x.value);
    })
    
    return this.http.post(this.localHost + url, {
      params: param,
      withCredentials: this.credentialValue
    });
  }
}
