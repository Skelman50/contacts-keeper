import React, { useContext } from "react";
import { ContactContext } from "../../context/contact/contactContext";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrentContact, clearCurrent } = contactContext;
  const onDelete = () => {
    deleteContact(contact._id);
    clearCurrent(contact._id);
  };

  const setCurrent = () => {
    setCurrentContact(contact);
  };
  return (
    <div className="card bg-lite">
      <h3 className="text-primary text-left">
        {contact.name}{" "}
        <span
          style={{ float: "right" }}
          className={`badge ${
            contact.type === "professional" ? "badge-success" : "badge-primary"
          }`}
        >
          {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {contact.email && (
          <li>
            <i className="fas fa-envelope-open"></i> {contact.email}
          </li>
        )}
        {contact.phone && (
          <li>
            <i className="fas fa-phone"></i> {contact.phone}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={setCurrent}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
