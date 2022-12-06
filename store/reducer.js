import {
    SET_CART,
    SET_RELOAD,
    SET_SEARCH,
    SET_SEARCHMESSAGE,
    SET_TOKEN,
    CLEAR_CART,
} from "./constrants";
const initState = {
    search: "",
    reload: false,
    searchMessage: "",
    cart: [7],
    token: "",
    info: "",
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
        case SET_TOKEN:
            let info = "";
            if (action.payload != "") {
                info = JSON.parse(
                    Buffer.from(
                        action.payload.split(".")[1],
                        "base64"
                    ).toString()
                );
            }

            //{sub: 'user1', roles: 'ROLE_ADMIN, ROLE_USER', iss: 'http://localhost:8080/login', exp: 1670316867}
            return {
                ...state,
                token: action.payload,
                info: info,
            };
        case CLEAR_CART:
            return { ...state, cart: [] };
    }
}

export { initState };
export default reducer;
