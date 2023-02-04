import {
    SET_RELOAD,
    SET_SEARCH,
    SET_SEARCHMESSAGE,
    SET_CART,
    SET_TOKEN,
    CLEAR_CART,
    CHANGE_QUAN_CART,
    REMOVE_FROM_CART,
    ADD_CART,
    SET_TYPE,
} from "./constrants";

export const setType = (payload) => ({
    type: SET_TYPE,
    payload,
});


export const setSearch = (payload) => ({
    type: SET_SEARCH,
    payload,
});

export const setReload = (payload) => ({
    type: SET_RELOAD,
    payload,
});

export const setSearchMessage = (payload) => ({
    type: SET_SEARCHMESSAGE,
    payload,
});

export const setCart = (payload) => ({
    type: SET_CART,
    payload,
});

export const addCart = (payload) => ({
    type: ADD_CART,
    payload,
});

export const removeFromCart = (payload) => ({
    type: REMOVE_FROM_CART,
    payload,
});

export const editQuanInCart = (payload) => ({
    type: CHANGE_QUAN_CART,
    payload,
});

export const setToken = (payload) => ({
    type: SET_TOKEN,
    payload,
});

export const clearCart = (payload) => ({
    type: CLEAR_CART,
    payload,
});
