import ContactForm from './ContactForm';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Filter from './Filter';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const verifyState = JSON.parse(localStorage.getItem('contacts'));
    console.log(verifyState);
    if (verifyState && verifyState.length) {
      setContacts(verifyState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitForm = formData => {
    const data = {
      id: nanoid(),
      ...formData,
    };
    contacts.find(
      item => item.name.toLowerCase() === formData.name.toLowerCase()
    )
      ? alert(`${formData.name} is already in contacts`)
      : setContacts(prevState => [...prevState, data]);
  };

  const onFilterHandler = event => {
    setFilter(event.target.value);
  };

  const onDeleteHandler = (event, id) => {
    event.preventDefault();
    setContacts(prevState => [
      ...prevState.filter(contact => contact.id !== id),
    ]);
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1 className={css['primary-title']}>Phonebook</h1>
      <ContactForm onSubmitForm={onSubmitForm} />
      <h2 className={css['secondary-title']}>Contacts</h2>
      <Filter filter={filter} onFilterHandler={onFilterHandler} />
      <ContactList
        contacts={filteredContacts}
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
};

export default App;
