import React, { useReducer } from "react";
import uuid from "uuid";
import { ContactContext } from "./contactContext";
import { contactReducer } from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: "1",
        name: "Ihor",
        phone: "+380666634078",
        email: "skelman50@gmail.com",
        type: "professional"
      },
      {
        id: "2",
        name: "Boris",
        phone: "+380504046520",
        email: "moshpit88@rambler.ru",
        type: "personal"
      }
    ],
    currentContact: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Add contact
  const addContact = contact => {
    const newContact = { ...contact, id: uuid.v4() };
    dispatch({ type: ADD_CONTACT, payload: newContact });
  };

  //Delete contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  //Set curent contact
  const setCurrentContact = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //Clear current contact
  const clearCurrent = (id = null) => {
    dispatch({ type: CLEAR_CURRENT, payload: id });
  };

  //Update contact

  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  //Filter contact
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  //Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.currentContact,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
