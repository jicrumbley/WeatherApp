import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { weather } from '../model/weather';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  lat;
  lon;
  retData;
  titleWord;
  subdata:any[] = new Array(8);
  day:Date ;
  constructor(private service: WeatherService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => { 
      this.day = new Date();
      console.log(this.day.toString());
      this.lat = position.coords.latitude; 
      this.lon = position.coords.longitude;
      this.service.getByLocForecast(this.lat, this.lon).subscribe((data) => {
        this.retData = data;
        this.getSubData(0);
        
      })
    });
  }

  getSubData(add:number)
  {

    for(let i = 0; i < this.subdata.length; i++)
    {
      this.subdata[i] = null;
    }
    let dateString = this.day.getFullYear() + "-" + this.addZ(this.day.getMonth()+1) + "-" + this.addZ(this.day.getDate()+add);
    
    this.titleWord = dateString;

    for(let i = 0; i < this.retData.cnt; i++)
    {
      let dtstr = this.retData.list[i].dt_txt.substr(0,10);
      if(dtstr == dateString)
      {
        let tmstr = this.retData.list[i].dt_txt.substr(11);
        switch(tmstr)
        {
          case '00:00:00':
            this.subdata[0] = this.retData.list[i];
            break;
          case '03:00:00':
            this.subdata[1] = this.retData.list[i];
            break;
          case '06:00:00':
            this.subdata[2] = this.retData.list[i];
            break;
          case '09:00:00':
            this.subdata[3] = this.retData.list[i];
            break;
          case '12:00:00':
            this.subdata[4] = this.retData.list[i];
            break;
          case '15:00:00':
            this.subdata[5] = this.retData.list[i];
            break;
          case '18:00:00':
            this.subdata[6] = this.retData.list[i];
            break;
          case '21:00:00':
            this.subdata[7] = this.retData.list[i];
            break;
          
        }
      }
    }

    console.log(this.retData.list[0].dt_txt.substr(11));
  }

  determineWord(add:number)
  {
    let day = this.day.getDay() + add;
    if(day >= 7)
      day = day - 7;
    
    let outWord = "";

    if(day == 0 )
      outWord = "Sunday";
    if(day == 1 )
      outWord = "Monday";
    if(day == 2 )
      outWord = "Tuesday";
    if(day == 3 )
      outWord = "Wednesday";
    if(day == 4 )
      outWord = "Thursday";
    if(day == 5 )
      outWord = "Friday";
    if(day == 6 )
      outWord = "Saturday";

    return outWord;
  }

  addZ(n) {
    return (n<10? '0' : '') + n;
  }
}
