import React, { useState, useContext, useEffect } from "react";
import { ContactContext } from "../../context/contact/contactContext";

const ContactForm = () => {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    type: "personal"
  });

  const contactContext = useContext(ContactContext);

  const {
    addContact,
    currentContact,
    clearCurrent,
    updateContact
  } = contactContext;

  useEffect(() => {
    if (currentContact !== null) {
      setContact(currentContact);
    } else {
      setContact({
        name: "",
        phone: "",
        email: "",
        type: "personal"
      });
    }
  }, [contactContext, currentContact]);

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const submitTitle = !currentContact ? "Add Contact" : "Update Contact";

  const clearAll = e => {
    e.preventDefault();
    clearCurrent();
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!currentContact) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearCurrent();
    setContact({
      name: "",
      phone: "",
      email: "",
      type: "personal"
    });
  };

  const { name, phone, email, type } = contact;
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{submitTitle}</h2>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="phone"
        placeholder="phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />
      Professional{" "}
      <div>
        <input
          type="submit"
          value={submitTitle}
          className="btn btn-primary btn-block"
        />
      </div>
      {currentContact && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
