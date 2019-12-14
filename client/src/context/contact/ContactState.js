import React, { useReducer } from "react";
import uuid from "uuid";
import { ContactContext } from "./contactContext";
import { contactReducer } from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT
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
    currentContact: null
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
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Update contact

  //Filter contact

  //Clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrent
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
