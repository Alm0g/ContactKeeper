import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../../context/auth/authContext';
import { ContactContext } from '../../context/contact/contactContext';

export const Navbar = ({ title, icon }) => {

    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, logout, user } = authContext;
    const { clearContacts } = contactContext;

    const onLogout = () => {
        logout();
        clearContacts();
    };

    const authLinks = (
        <div>
            <li>
                Hello { user && user.name }
            </li>

            <li>
                <a onClick={onLogout} href="#!">
                    <i className='fas fa-sign-out-alt' />{' '} 
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>

        </div>
    );

    const guestLinks = (
        <div>
            <li>
                <Link to='/register'>Register</Link>
            </li>

            <li>
                <Link to='/login'>Login</Link>
            </li>
        </div>
    );

    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon}/> {title}
            </h1>

            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>

        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}