import React, { useState, useEffect } from 'react';
import personsService from './services/dbpersons';
import './App.css'

const Number = ({ person, handleDelete }) => {
  return (
    <p>
      {person.name}: {person.phone}
      <button id={person.id} onClick={handleDelete}>delete</button>
    </p>
  );
}

const Numbers = ({ persons, handleDelete }) => {
  return (
    persons.map((person) => <Number key={person.name} person={person} handleDelete={handleDelete} />)
  );
}

const Form = ({ addNumber,
                newName,
                handleNameChange,
                newPhone,
                handlePhoneChange }) => {
  return (
    <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleDelete = (event) => {
    const id = event.target.id;
    console.log(id);
    personsService.deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id != id));
      })
  }

  const addNumber = (event) => {
    event.preventDefault();
    const newNumber = {
      name: newName,
      phone: newPhone
    }

    if (persons.map(person => person.name).indexOf(newNumber.name) < 0) {
      personsService.create(newNumber)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
        });
      setErrorMessage("Person added to the phonebook")
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } else {
      setErrorMessage("Person already in the phonebook")
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
    setNewName('');
    setNewPhone('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Form addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Numbers persons={persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase()))} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
