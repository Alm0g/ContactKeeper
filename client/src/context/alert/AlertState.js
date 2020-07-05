import React, { useReducer } from 'react';
import { v4 } from 'uuid';
import { alertContext } from './alertContext';
import { alertReducer } from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'


export const AlertState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Set Alert
    const setAlert = (msg, type, timeout = 5000) => {
        const id = v4();

        dispatch({
            type: SET_ALERT,
            payload: { msg,
                       type,
                       id 
                    }
        });

        setTimeout(() => 
            dispatch({ type: REMOVE_ALERT, payload: id }), timeout
        )
    };
    
    return (
        <alertContext.Provider 

            value={{
                alerts: state,
                setAlert
            }}
            >
            {props.children}
        
        </alertContext.Provider>
    );
    
};