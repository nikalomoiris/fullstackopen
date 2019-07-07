import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState(
    {
      current: {
        temp_c: 0,
        wind_kph: 0,
        wind_dir: "N",
        condition: {
          icon: "//cdn.apixu.com/weather/64x64/night/296.png"
        }
      }
    }
  );
  const WEATHER_API_KEY = '8c434935e94847609d9222919190607';
  const CAPITAL = country.capital;

  useEffect(() => {
    const URL = `http://api.apixu.com/v1/current.json?key=${WEATHER_API_KEY}&q=${CAPITAL}`;
    console.log('weather effect');
    axios
      .get(URL)
      .then((response) => {
        console.log("wether promise fulfilled");
        setWeather(response.data);
      })
  }, [CAPITAL]);

  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" style={{ maxWidth: 150 }} />
      <h2>Weather in {country.capital}</h2>
      <p><strong>temperature:</strong> {weather.current.temp_c} Celsius</p>
      <img src={weather.current.condition.icon} alt="condition icon" />
      <p><strong>wind:</strong> {weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
    </>
  );
}

const Countries = ({ countries, handleClick }) => {
  if (countries.length < 1) {
    return (
      <p>No country matches the search term</p>
    );
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    );
  } else if (countries.length < 10) {
    return (
      countries.map(country =>
        <li key={country.alpha3Code}>{country.name}<button key={country.alpha2Code} onClick={() => handleClick(country.name)}>show</button></li>)
    );
  } else {
    return (
      <p>Too many matches, specify another filter</p>
    );
  }
}

const App = () => {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        console.log("promise fulfilled");
        setCountries(response.data);
      })
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleClick = (country) => {
    setFilter(country);
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase()))}
        handleClick={handleClick}/>
    </div>
  )
}

export default App;
