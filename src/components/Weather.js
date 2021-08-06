import React, { useState } from 'react'
import DisplayWeather from './DisplayWeather';
import './weather.css';
import CloudIcon from '@material-ui/icons/Cloud';


const Weather = () => {
    const APIKEY = "d9308bdb76926309bf412898d0b5f91d"


     const [form, setForm] = useState({
         city:"",
         country:""
     });

     const [weather, setWeather] = useState([])

     async function weatherData(e){
         e.preventDefault();
         if(form.city===""){
             alert("Add Value");
         }else{
             const data = await fetch(
                 `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${APIKEY}`
                 )
                 .then((res)=>res.json())
                 .then((data)=>data);

                 setWeather({
                     data:data
                 });

                 let lat = data.coord.lat;
                 let lon = data.coord.lon;

                 var endpoint =
		`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${APIKEY}`;
	var forecastEl = document.getElementsByClassName("forecast");

	fetch(endpoint)
	.then(function (response) {
		if (200 !== response.status) {
			console.log(
				"Looks like there was a problem. Status Code: " + response.status
			);
			return;
		}

		forecastEl[0].classList.add('loaded');

		response.json().then(function (data) {
			var fday = "";
			data.daily.reverse().forEach((value, index) => {
				if (index > 0) {
					var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
						weekday: "long",
					});
					var icon = value.weather[0].icon;
					var temp = value.temp.day.toFixed(0);
					fday = `<table class="forecast-day">
                            <tr>
						<td>${dayname}</td>
						<td><span class="ico-${icon}" title="${icon}"></span></td>
                        

						<td class="forecast-day--temp">${temp}<sup>°C</sup></td>
                        </tr>
					</table>`;
					forecastEl[0].insertAdjacentHTML('afterbegin', fday);
				}
			});
		});
	})
	.catch(function (err) {
		console.log("Fetch Error :-S", err);
	});

         }
     }

     const handleChange = (e) =>{
         let name = e.target.name;
         let value = e.target.value;

         if(name==="city"){
             setForm({...form,city:value})
         }
         if(name==="country"){
            setForm({...form,country:value})
        }
     };
     
    return (
        <div className="weather">
            <span className="title">Weather App</span>
            <br/>
            <form>
                <input type="text" name="city" placeholder="city" onChange={e=>handleChange(e)} />
                &nbsp;
                <input type="text" name="country" placeholder="country" onChange={e=>handleChange(e)} />
                &nbsp;
                <button className="getweather" onClick={e=>weatherData(e)} >
                    Search <CloudIcon style={{fontSize:'1rem'}} /> 
                </button>
            </form>
            {
                weather.data !==undefined?
                <div>
                    <DisplayWeather data={weather.data} />
                </div>
                :null
            }
        </div>
    )
}

export default Weather
