import React, {useState} from "react";
import axios from "axios";

function App() {

  const [data,setData] = useState({})
  const [location, setLocation] = useState('')

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=30c3422a63525cae3cf563842cb21ba2`

  const searchLocation = (event) => {
    if (event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }

  }

  return (
    <div className="app">
      
      
      <div className="container">

        {data.main == undefined &&
          <><div className="search mainpg">
              <p className="title">Type a Location and hit Enter to proceed</p>
              <input
                className="main-input"
                value={location}
                onChange={event => setLocation(event.target.value)}
                onKeyPress={searchLocation}
                placeholder='Enter Location'
                type="text" />
            </div></>
        
        }
        
        

        {data.main != undefined && 
          <><div className="search">
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text" />
        </div><div className="top">
            <div className="location">
              <p className="name">{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp}°F</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
              <p></p>
            </div>
          </div><div className="bottom">
              <div className="feels">
                {data.main ? <p className="bbox">{data.main.feels_like.toFixed()}°F</p> : null}
                <p className="thin">Feels like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className="bbox">{data.main.humidity}%</p> : null}
                <p className="thin">Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className="bbox">{data.wind.speed.toFixed()}</p> : null}
                <p className="thin">Wind Speed</p>
              </div>
            </div></> 
        }
        
      </div>
    </div>
  );
}

export default App;
