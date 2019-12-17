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

export const contactReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, payload],
        loading: false
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: [],
        filtered: null,
        error: null,
        currentContact: null
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact._id !== payload),
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        currentContact: payload
      };
    case CLEAR_CURRENT:
      const currentContact = () => {
        if (payload === null) {
          return null;
        }
        if (state.currentContact && payload === state.currentContact.id) {
          return null;
        }
        return state.currentContact;
      };
      return {
        ...state,
        currentContact: currentContact()
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        loading: false,
        contacts: state.contacts.map(contact => {
          if (contact._id === payload._id) {
            return { ...payload };
          }
          return contact;
        })
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regexp = new RegExp(`${payload}`, "gi");
          return contact.name.match(regexp) || contact.email.match(regexp);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};
