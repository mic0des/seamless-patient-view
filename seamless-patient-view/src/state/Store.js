import React, { createContext, useReducer } from 'react';
import Reducer from './Reducer';

const initialState = {
    patientData: [],
    numberOfPatients: 0,
    averageAge: 0,
    numberOfPediatricPatients: 0
}

export const Context = createContext(initialState); 

export const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState)

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}