import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { weather } from '../model/weather';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent implements OnInit {

  retData:weather;
  name:string;
  printName:string;
  countryCode:string = "us";
  constructor(private service: WeatherService) { }

  ngOnInit() {
  }

  changeCC(event)
  {
    let cc:string = event.target.value;
    this.countryCode = cc.toLowerCase();
    console.log(event.target.value);
  }

  changeLoc(event)
  {
    this.name = event.target.value;
  }

  getWeather()
  {
    if(this.name == null)
    {
      alert("Please enter a city name");
    }
    else
    {
      
      this.service.getByLocation(this.name, this.countryCode).subscribe((data) => {
       
        if(data == null)
          console.log("null data");

        this.retData = new weather();
        this.retData.title = data.weather[0].main;
        this.retData.country = data.sys.country;
        this.retData.description = data.weather[0].description;
        this.retData.temperature = this.KtoF(data.main.temp);
        this.retData.pressure = data.main.pressure;
        this.retData.humidity = data.main.humidity;
        this.retData.speed = this.MeterToMile(data.wind.speed);
        this.printName = data.name;

      });
    }
  }

  private MeterToMile(m:number)
  {
    let mi = m * 2.237;
    mi = Number.parseFloat(Number(mi).toFixed(2));
    return mi;
  }

  private KtoF(k:number)
  {
    let f = (k - 273.15) * 9/5 + 32;
    f = Number.parseFloat(Number(f).toFixed(2));
    return f;
  }

}
