import React, { useState } from 'react';

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

  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

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
      setPersons(persons.concat(newNumber));
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
