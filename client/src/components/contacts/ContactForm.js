import React, { useState, useContext, useEffect } from 'react';
import { ContactContext } from "../../context/contact/contactContext";

export const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    const { addContact, current, clearCurrent, updateCurrent } = contactContext;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current])

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onChange = event => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        })
    };

    const onSubmit = event => {
        event.preventDefault()
        if (current === null) {
            addContact(contact);
        } else {
            updateCurrent(contact);
        }
        clearAll();
    };

    const clearAll = () => {
        clearCurrent(); 
    };

    return (
        <form onSubmit={onSubmit}>
            
            <h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
            
            <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
            />
            
            <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={onChange}
            />
            
            <input
                type='text'
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange={onChange}
            />
            
            <h5>Contact Type</h5>
            <input type="radio" onChange={onChange} name="type" value="personal" checked={type==='personal'} />
            Personal{' '}
            <input 
                type="radio" 
                onChange={onChange} 
                name="type" 
                value="professional" 
                checked={type==='professional'} />
            Professional
            <div>
                <input 
                type="submit" 
                value={current ? 'Edit Contact' : 'Add Contact'}
                className='btn btn-primary btn-block' />
            </div>
            {current && 
                <div>
                    <button className='btn btn-light btn-block' onClick={clearAll}>
                    Clear
                    </button>
                </div>
            }

        </form>
    )
}
