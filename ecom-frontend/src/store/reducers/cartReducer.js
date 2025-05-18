const initialState = {
    cart: [],
    totalPrice: 0,
    cartId: null,
}


export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        // add item to cart
        case "ADD_CART":
            const productToAdd = action.payload;
            const existingProduct = state.cart.find(
                (item) => item.productId === productToAdd.productId
            );

            // if product already exists in cart
            if(existingProduct) {
                const updatedCart = state.cart.map((item) => {
                    if (item.productId === productToAdd.productId) {
                        return productToAdd;
                    } else {
                        return item;
                    }
                });

                return {
                    ...state,
                    cart: updatedCart,
                };
            } 
            // new cartItem
            else {
                const newCart = [...state.cart, productToAdd];
                return {
                    ...state,
                    cart: newCart,
                };
            }

        // remove from cart
        case "REMOVE_CART":
            return {
                ...state,
                cart: state.cart.filter(
                    //include products whose productId is not same as the payload.productId
                    (item) => item.productId !== action.payload.productId 
                ),
            };

        // update the totalPrice, cartId and cart in cart state
        case "GET_USER_CART_PRODUCTS": 
            return {
                ...state,
                cart: action.payload,
                totalPrice: action.totalPrice,
                cartId: action.cartId,
            };
            
        // empty cart contents
        case "CLEAR_CART":
            return { cart:[], totalPrice: 0, cartId: null};
        default:
            return state;
    }
    return state;
}