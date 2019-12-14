import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT
} from "../types";

export const contactReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, payload]
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== payload)
      };
    case SET_CURRENT:
      console.log(payload);
      return {
        ...state,
        currentContact: payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        currentContact: null
      };
    default:
      return state;
  }
};
