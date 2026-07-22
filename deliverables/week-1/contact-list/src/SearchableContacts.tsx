import React from 'react'
import { initialContacts } from './types'
import { ContactList } from './ContactList'
import { ContactForm } from './ContactForm'

// TODO: manage contact state; render a "Search contacts" input that filters by
// name or email (case-insensitive); render ContactList and ContactForm (adding appends).
export function SearchableContacts() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [contacts, setContacts] = React.useState(initialContacts);
  return (
    <div className="contacts-container">
      <h1>Searchable Contacts</h1>
      <input
        type="text"
        aria-label="Search contacts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ContactList
        contacts={contacts.filter(
          (contact) =>
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase())
        )}
      />
      <ContactForm onAdd={(contact) => setContacts((prevContacts) => [...prevContacts, { ...contact, id: crypto.randomUUID() }])} />
    </div>
  );
}
