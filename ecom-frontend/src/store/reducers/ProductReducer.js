const initialState = {
    products: null,
    categories: null,
    pagination: {},
};

// product reducer
export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        // products fetching
        case "FETCH_PRODUCTS":
            return {
                ...state,
                products: action.payload,
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },
            };

        // case "FETCH_PRODUCTS":
        //     return {
        //         ...state,
        //         products: action.payload,
        //         pagination: {
        //             ...state.pagination,
        //             pageNumber: action.pageNumber,
        //             pageSize: action.pageSize,
        //             totalElements: action.totalElements,
        //             totalPages: action.totalPages,
        //             lastPage: action.lastPage,
        //         },
        //     };
    
        // categories fetching
        case "FETCH_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
                pagination: {
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage,
                },
            };
        
    
        default:
            return state;
    }
};