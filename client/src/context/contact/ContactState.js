import React, { useReducer } from "react";
import axios from "axios";
import { ContactContext } from "./contactContext";
import { contactReducer } from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [],
    currentContact: null,
    filtered: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Add contact
  const addContact = async contact => {
    try {
      const response = await axios.post("/api/contacts", contact);
      dispatch({ type: ADD_CONTACT, payload: response.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.error });
    }
  };

  //get contacts
  const getContacts = async () => {
    try {
      const response = await axios.get("/api/contacts");
      dispatch({ type: GET_CONTACTS, payload: response.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.error });
    }
  };

  //Delete contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.error });
    }
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

  const updateContact = async contact => {
    try {
      const response = await axios.put(`/api/contacts/${contact._id}`, contact);
      dispatch({ type: UPDATE_CONTACT, payload: response.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.error });
    }
  };

  //Filter contact
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  //Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  //clear contacts

  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.currentContact,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
