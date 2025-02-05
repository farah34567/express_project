import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`http://localhost:5001/api/contacts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContact(data);
      } catch (error) {
        alert("Failed to fetch contact details.");
      }
    };
    fetchContact();
  }, [id]);

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5001/api/contacts/${id}`,
        contact,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Contact updated successfully!");
      navigate("/contacts");
    } catch (error) {
      alert("Failed to update contact. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Contact</h2>
      <form onSubmit={handleUpdateContact}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Age"
            value={contact.age}
            onChange={(e) => setContact({ ...contact, age: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Phone"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Update Contact</button>
      </form>
    </div>
  );
};

export default EditContact;
