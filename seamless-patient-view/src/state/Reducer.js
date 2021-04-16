const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA': {
            return {
                ...state,
                patientData: action.payload
            }
        }
    }
};

export default Reducer;