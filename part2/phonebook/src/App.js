import React, { useState } from 'react';

const Numbers = ({ persons }) => {
  return (
    persons.map((person) => <p key={person.name}>{person.name}: {person.phone}</p>)
  );
}

const App = () => {

  const [ persons, setPersons ] = useState([
    {
      name: 'Arto Hellas',
      phone: '555-555-5555'
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
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
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  );
}

export default App;
