import React, { useState, useEffect } from 'react';
import personsService from './services/dbpersons';

const Number = ({ person }) => {
  return <p>{person.name}: {person.phone}</p>
}

const Numbers = ({ persons }) => {
  return (
    persons.map((person) => <Number key={person.name} person={person} />)
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

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

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
    } else {
      alert('The name provided is already in the phonebook');
    }
    setNewName('');
    setNewPhone('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Form addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Numbers persons={persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase()))} />
    </div>
  );
}

export default App;
