import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5001/api/contacts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(data);
    };
    fetchContacts();
  }, []);

  return (
    <div className="container">
      <h2>Contacts</h2>
      <Link to="/contacts/add">Add New Contact</Link>
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            {contact.name} - {contact.phone}
            <Link to={`/contacts/edit/${contact._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
