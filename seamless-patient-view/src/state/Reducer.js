const Reducer = (state, action) => {
    debugger
    switch (action.type) {
        case 'SET_DATA': 
            debugger
            return {
                ...state,
                patientData: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;