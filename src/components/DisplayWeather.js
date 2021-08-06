import React from 'react'
import './displayweather.css'

const DisplayWeather = (props) => {
    const btn_style = {
        color:'#000',
        textDecoration:'none'
      };

    const {data} = props;

    const iconurl = "http://openweathermap.org/img/wn/" + `${data.cod !=404?data.weather[0].icon:null}` + ".png";

    


    


    return (
        <div className="displayweather">
            {
                data.cod != 404?
                <React.Fragment>
                    <div className="maincard">
                <span className="cardtitle">
                    {data.name},{data.sys.country}.Weather
                </span>
                <span className="cardsubtitle">
                    As of {new Date().toLocaleTimeString()}
                </span>
                <h1>
                    {Math.floor(data.main.temp-273.15)}
                    {console.log(data.coord.lon)}
                    {console.log(data.coord.lat)}
                    <sup>o</sup>
                </h1>
            </div>
            <section class="weatherdetails">
        <div class="section2">
          <div class="forecast">

          </div>
        </div>
      </section>
                </React.Fragment>
                :

                <div className="maincard">
                    <h4>Something went wrong at our End</h4>
                    <button className="getweather">
                <a className="rty" href="/" style={btn_style}>Retry</a>
            </button>
                </div>
            }

        </div>
    )
}

export default DisplayWeather
