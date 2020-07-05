import React, { useState, useContext, useEffect } from 'react';
import { alertContext } from '../../context/alert/alertContext';
import { AuthContext } from '../../context/auth/authContext';

export const Register = props => {

    const AlertContext = useContext(alertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = AlertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {

        // Redirecting if isAuthenticated is set to true
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState ({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = user;

    const onChange = event => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({
                name,
                email,
                password
            });
        }
    };

    return (
        <div>
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type="text" name="name" value={name} onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" value={email} onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password" value={password} onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange}/>
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}
