const initialState = {
    paymentMethod: null,
};


export const paymentMethodReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PAYMENT_METHOD": //store the payment method in redux store
            return {
                ...state,
                paymentMethod: action.payload,
            };
        default:
            return state;
    }
};