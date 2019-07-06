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
    </>
  );
}

const Countries = ({ countries }) => {
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
        <li key={country.alpha3Code}>{country.name}</li>)
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

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries.filter(country =>
              country.name.toLowerCase().includes(filter.toLowerCase()))} />
    </div>
  )
}

export default App;
