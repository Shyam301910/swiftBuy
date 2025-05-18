const initialState = {
    isLoading: false, // loading to display items on screen
    errorMessage: null, // error message
    categoryLoader: false, // used only in the products page
    categoryError: null, // used only in the products page
    btnLoader: false, // loading to display the button
};

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        // product loading action
        case "IS_FETCHING":
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
            };
        // button loading to be displayed
        case "BUTTON_LOADER":
            return {
                    ...state,
                    btnLoader: true,
                    errorMessage: null,
                    categoryError: null,
                };
        // products fetched        
        case "IS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                btnLoader: false,
                categoryError: null,
                categoryLoader: false,
            };
        // error while fetching products
        case "IS_ERROR":
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
                btnLoader: false,
                categoryLoader: false,
            }
        // category success
        case "CATEGORY_SUCCESS":
            return {
                ...state,
                categoryLoader: false,
                categoryError: null,
            };
        //category loading
        case "CATEGORY_LOADER":
            return {
                ...state,
                categoryLoader: true,
                categoryError: null,
                errorMessage: null,
            }

        default:
            return state;
    }  
};