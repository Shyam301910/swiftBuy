import api from "../../api/api"

// Action for fetching products
export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });

        //hitting the api
        const { data } = await api.get(`/public/products?${queryString}`);
        console.log('data: ', data);

        dispatch({
            type: "FETCH_PRODUCTS", // action type
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        // error action
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products",
        });
    }
};

// action for fetching categories
export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        const { data } = await api.get(`/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_ERROR" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories",
        });
    }
};

//action for adding products to the cart in redux store and localStorage
export const addToCart = (data, qty = 1, toast) =>
    (dispatch, getState) => {
        // Find the product
        const { products } = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        // Check for stocks
        const isQuantityExist = getProduct.quantity >= qty;

        // If in stock -> add
        if (isQuantityExist) {
            dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
            toast.success(`${data?.productName} added to the cart`);
            // adding cartitem to localstorage
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            // error
            toast.error("Out of stock");
        }
    };

// increase quantity action
export const increaseCartQuantity =
    (data, toast, currentQuantity, setCurrentQuantity) =>
        (dispatch, getState) => {
            // Find the product
            const { products } = getState().products;

            const getProduct = products.find(
                (item) => item.productId === data.productId
            );

            const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

            if (isQuantityExist) {
                const newQuantity = currentQuantity + 1;
                setCurrentQuantity(newQuantity);

                dispatch({
                    type: "ADD_CART",
                    payload: { ...data, quantity: newQuantity + 1 },
                });
                localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
            } else {
                toast.error("Quantity Reached to Limit");
            }

        };


// decrease quantity action
export const decreaseCartQuantity =
    (data, newQuantity) => (dispatch, getState) => {
        dispatch({
            type: "ADD_CART",
            payload: { ...data, quantity: newQuantity },
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    }

// remove cartItem from cart action
export const removeFromCart = (data, toast) => (dispatch, getState) => {
    dispatch({ type: "REMOVE_CART", payload: data });
    toast.success(`${data.productName} removed from cart`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}


// action to authenticate user in the login page
export const authenticateSignInUser
    = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signin", sendData); // posting the data to backend /ath/signin 
            dispatch({ type: "LOGIN_USER", payload: data }); 
            localStorage.setItem("auth", JSON.stringify(data)); // store the user in localStorage
            reset();
            toast.success("Login Success");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server Error");
        } finally {
            setLoader(false);
        }
    }

// action to register new user in sign up page
export const registerNewUser
    = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signup", sendData); // posting the data to backend /auth/signup
            reset();
            toast.success(data?.message || "User Registered Successfully");
            navigate("/login"); // after signup, navigate to login page
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error");
        } finally {
            setLoader(false);
        }
    };

// action for logout
export const logOutUser = (navigate) => (dispatch) => {
    dispatch({ type: "LOG_OUT" });
    localStorage.removeItem("auth"); // remove auth from local storage
    navigate("/login");
};

// action to add or update new address
export const addUpdateUserAddress =
    (sendData, toast, addressId, setOpenAddressModal) => async (dispatch, getState) => {
        /*
        const { user } = getState().auth;
        await api.post(`/addresses`, sendData, {
              headers: { Authorization: "Bearer " + user.jwtToken },
            });
        */
        dispatch({ type: "BUTTON_LOADER" });
        try {
            // if new address, post to db
            if (!addressId) {
                const { data } = await api.post("/addresses", sendData);
            }
            // if editing address, update to db
            else {
                await api.put(`/addresses/${addressId}`, sendData);
            }

            // fetch all addresses
            dispatch(getUserAddresses());
            toast.success("Address saved successfully");
            dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server Error");
            dispatch({ type: "IS_ERROR", payload: null });
        } finally {
            setOpenAddressModal(false); // close the modal, when fetching is done
        }
    };

// action to delete user address from db
export const deleteUserAddress =
    (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {
        try {
            dispatch({ type: "BUTTON_LOADER" });
            await api.delete(`/addresses/${addressId}`); // delete address from db
            dispatch({ type: "IS_SUCCESS" });
            dispatch(getUserAddresses()); // fetch addresses again
            dispatch(clearCheckoutAddress()); // read comment below
            toast.success("Address deleted successfully");
        } catch (error) {
            console.log(error);
            dispatch({
                type: "IS_ERROR",
                payload: error?.response?.data?.message || "Some Error Occured",
            });
        } finally {
            setOpenDeleteModal(false); // close the delete modal
        }
    };

// if we click on the delete button on the address div, it counts as a click and the address gets selected, after deleting the address, this action helps to remove the selected address from the redux store
export const clearCheckoutAddress = () => {
    return {
        type: "REMOVE_CHECKOUT_ADDRESS",
    }
};

// action to fetch all user addresses
export const getUserAddresses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" }); // in error reducer
        const { data } = await api.get(`/addresses`); // fetch all addresses from db
        dispatch({ type: "USER_ADDRESS", payload: data }); // add new address to the address list in redux store
        dispatch({ type: "IS_SUCCESS" }); // in error reducer

    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user addresses",
        });
    }
};

// action to add the selected address to local storage and redux store
export const selectUserCheckoutAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));

    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    }
};

// action to store the payment method in redux store
export const addPaymentMethod = (method) => {
    return {
        type: "ADD_PAYMENT_METHOD",
        payload: method,
    }
};

// create cart in db
export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        await api.post('/cart/create', sendCartItems); //create cart with the cartitems
        // both cartItem and cart tables are updated
        await dispatch(getUserCart()); // action to fetch the user cart
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create cart items",
        });
    }
};

// action to fetch the user cart
export const getUserCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get('/carts/users/cart'); //gets the user cart

        dispatch({
            type: "GET_USER_CART_PRODUCTS", // update the totalPrice, cartId and cart in cart state
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.cartId
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart)); // update the cart in localstorage
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch cart items",
        });
    }
};

// action to create payment in db
export const createStripePaymentSecret
    = (totalPrice) => async (dispatch, getState) => {
        try {
            dispatch({ type: "IS_FETCHING" });
            const { data } = await api.post("/order/stripe-client-secret", {
                "amount": Number(totalPrice) * 100,
                "currency": "usd"
            });
            dispatch({ type: "CLIENT_SECRET", payload: data }); // set client secret in redux store
            localStorage.setItem("client-secret", JSON.stringify(data)); // set client secret in localStorage
            dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to create client secret");
        }
    };

// orders and payment tables updated
export const stripePaymentConfirmation
    = (sendData, setErrorMesssage, setLoadng, toast) => async (dispatch, getState) => {
        try {
            const response = await api.post("/order/users/payments/online", sendData); // data posted to orders and payment tables
            if (response.data) {
                localStorage.removeItem("CHECKOUT_ADDRESS");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("client-secret");
                dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
                dispatch({ type: "CLEAR_CART" });
                toast.success("Order Accepted");
            } else {
                setErrorMesssage("Payment Failed. Please try again.");
            }
        } catch (error) {
            setErrorMesssage("Payment Failed. Please try again.");
        }
    };