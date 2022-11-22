import {
    SET_CART,
    SET_RELOAD,
    SET_SEARCH,
    SET_SEARCHMESSAGE,
} from "./constrants";
const initState = {
    search: "",
    reload: false,
    searchMessage: "",
    cart: [7],
};

function reducer(state, action) {
    switch (action.type) {
        case SET_SEARCH:
            return {
                ...state,
                search: action.payload,
            };
        case SET_RELOAD:
            return {
                ...state,
                reload: action.payload,
            };
        case SET_SEARCHMESSAGE:
            return {
                ...state,
                searchMessage: action.payload,
            };
        case SET_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
    }
}

export { initState };
export default reducer;
