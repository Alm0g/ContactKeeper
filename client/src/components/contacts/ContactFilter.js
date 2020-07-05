import React, { useContext, useRef, useEffect } from 'react';
import { ContactContext } from '../../context/contact/contactContext';

export const ContactFilter = () => {

    const contactContext = useContext(ContactContext);
    const text = useRef();
    const { filterContacts, clearContacts, filtered } = contactContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = null;
        }
    });

    const onChange = event => {
        if (text.current.value !== '') {
            filterContacts(event.target.value);
        } else {
            clearContacts();
        }
    }

    return (
        <form>
            <input 
                ref={text}  
                type='text' 
                placeholder='Filter Contacts...' 
                onChange={onChange} 
                />
        </form>
    )
}
