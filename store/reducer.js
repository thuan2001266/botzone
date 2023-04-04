import {
    SET_CART,
    SET_RELOAD,
    SET_SEARCH,
    SET_SEARCHMESSAGE,
    SET_TOKEN,
    SET_REFRESHTOKEN,
    CLEAR_CART,
    CHANGE_QUAN_CART,
    REMOVE_FROM_CART,
    ADD_CART,
    SET_TYPE,
    SET_FULL_PAGE_LAYER,
    SET_CRUD_ACTION
} from "./constrants";
const initState = {
    type: "",
    search: "",
    reload: false,
    searchMessage: "",
    cart: [],
    token: "",
    refreshToken: "",
    info: "",
    pageLayer: false,
    crud: {
        create: false,
        delete: false,
        update: false,
        productId: -1,
        execute: false,
        productInfo: {
                id: "",
                name: "",
                price: [],
                color: [],
                img: [],
                optionToBuy: [],
                discount: "",
                date: -1,
                type: "",
                model: "",
        }
    }
};

function reducer(state, action) {
    switch (action.type) {
        case SET_TYPE: 
            return {
                ...state,
                type: action.payload
            }
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
            localStorage.setItem("cart", [...state.cart, action.payload])
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
        case ADD_CART: 
            return {
                ...state,
                cart: [action.payload]
            }
        case REMOVE_FROM_CART:
            const newCart = state.cart.filter((e) => {return e!==action.payload })
            return {
                ...state,
                cart: newCart
            };
        case CHANGE_QUAN_CART:
            const findInCart = state.cart.map(e => {
                if (e==action.payload.object) {
                    if (action.payload.action == "add") return {...e, quant: e.quant+1}
                    if (e.quant>1) return {...e, quant: e.quant-1}
                    return e 
                } else {
                    return e
                }
            })
            return {
                ...state,
                cart: findInCart
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
        case SET_REFRESHTOKEN:
            return {
                ...state,
                refreshToken: action.payload,
            };
        case CLEAR_CART:
            return { ...state, cart: [] };
        case SET_FULL_PAGE_LAYER:
            return { ...state, pageLayer: action.payload };
        case SET_CRUD_ACTION:
            return {...state, crud: action.payload}

    }
}

export { initState };
export default reducer;
