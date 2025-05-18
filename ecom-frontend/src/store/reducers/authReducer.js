const initialState = {
    user: null,
    address: [],
    clientSecret: null,
    selectedUserCheckoutAddress: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, user: action.payload }; // user: username,password
        case "USER_ADDRESS":
            return { ...state, address: action.payload }; // add new address to the address list
        case "SELECT_CHECKOUT_ADDRESS":
            return { ...state, selectedUserCheckoutAddress: action.payload }; // add selected address to the redux store
        case "REMOVE_CHECKOUT_ADDRESS":
            return { ...state, selectedUserCheckoutAddress: null }; // if we click on the delete button on the address div, it counts as a click and the address gets selected, after deleting the address, this action helps to remove the selected address from the redux store
        case "CLIENT_SECRET":
            return { ...state, clientSecret: action.payload }; // set the clientSecret
        case "REMOVE_CLIENT_SECRET_ADDRESS":
            return { ...state, clientSecret: null, selectedUserCheckoutAddress: null };
        case "LOG_OUT": 
        // user: null
        // address: null
            return { 
                user: null,
                address: null,
             };
             
        default:
            return state;
    }
};