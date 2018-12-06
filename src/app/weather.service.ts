import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { weather } from './model/weather';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const HttpOptions = {headers: new HttpHeaders({
  'Content-Type':'application.json'
})
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  private key = "&appid=25fe875867f6e291e7996b9a67c2a94b";
  private root = "https://api.openweathermap.org/data/2.5/weather?";

  private extractData(res:Response){
    const body = res;
    return body || { }
  }

  public getByLocation(loc:string,cc:string):Observable<any>
  {
    var url = this.root + "q=" + loc + "," + cc + this.key;
    var data:Observable<any>;

    data = this.http.get(url).pipe(map(this.extractData));
    
    return data;

  }

  public getById(id:number):Observable<any>
  {
    var url = this.root + "id=" + id + this.key;
    console.log(url);
    return this.http.get(url).pipe(map(this.extractData));
  }

  public getByZip(zip:number, cc:string):Observable<any>
  {
    var url = this.root + "zip=" + zip + "," + cc + this.key;
    return this.http.get(url).pipe(map(this.extractData));
    
  }

  public getByLocForecast(lat:number, lon:number):Observable<any>
  {
    var url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon +  '&appid=25fe875867f6e291e7996b9a67c2a94b';
    return this.http.get(url).pipe(map(this.extractData));
  }

}
