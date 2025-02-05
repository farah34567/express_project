import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await axios.get("http://localhost:5001/api/contacts", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setContacts(data);
        } catch (error) {
          console.error("Failed to fetch contacts.");
        }
      }
    };
    fetchContacts();
  }, []);

  const addContact = async (contactData) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post("http://localhost:5001/api/contacts", contactData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts([...contacts, data]);
    } catch (error) {
      throw new Error("Failed to add contact.");
    }
  };

  const updateContact = async (id, updatedData) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.put(`http://localhost:5001/api/contacts/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(contacts.map((contact) => (contact._id === id ? data : contact)));
    } catch (error) {
      throw new Error("Failed to update contact.");
    }
  };

  const deleteContact = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5001/api/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      throw new Error("Failed to delete contact.");
    }
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, updateContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};
