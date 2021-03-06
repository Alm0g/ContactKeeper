import React, { useReducer } from 'react';
import axios from 'axios';
import { ContactContext } from './contactContext';
import { ContactReducer } from './contactReducer';
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
    CLEAR_CONTACT
} from '../types'


export const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add contact
    const addContact = async contact => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {

            const res = await axios.post('/api/contacts', contact, config);

            dispatch({ 
                    type: ADD_CONTACT,
                    payload: res.data 
                });

        } catch (error) {
            dispatch({ 
                type: CONTACT_ERROR,
                payload: error.response.msg
            });
        }
    }

    // Get Contacts
    const getContacts = async () => {

        try {
            const res = await axios.get('/api/contacts');

            dispatch({ 
                    type: GET_CONTACTS,
                    payload: res.data 
                });

        } catch (error) {
            dispatch({ 
                type: CONTACT_ERROR,
                payload: error.response.msg
            });
        }
    }

    // Delete contact
    const deleteContact = async id => {

        try {
            await axios.delete(`/api/contacts/${id}`);

            dispatch({
                type: DELETE_CONTACT,
                payload: id
            });

        } catch (error) {
            dispatch({ 
                type: CONTACT_ERROR,
                payload: error.response.msg
            });
        }
    }

    // Clear Contacts
    const clearContact = () => {
        dispatch({
            type: CLEAR_CONTACT
        });
    };

    // Set current contact
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        });
    }

    // Clear current contact
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        });
    }

    // Update contact
    const updateCurrent = async contact => {

        console.log("Added a new contact: ", contact);

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(`/api/contacts${contact._id}`, contact, config);

            console.log("This is received data from put: ", res)

            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });

        } catch (error) {
            dispatch({ 
                type: CONTACT_ERROR,
                payload: error.response.msg
            });
        }
    }

    // Filter contacts
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS, 
            payload: text
        });
    };

    // Clear filter
    const clearContacts = () => {
        dispatch({
            type: CLEAR_FILTER
        });
    };

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateCurrent,
            filterContacts,
            clearContacts,
            getContacts,
            clearContact
        }}>
            { props.children }
        </ContactContext.Provider>
    )

};