import {
    SET_RELOAD,
    SET_SEARCH,
    SET_SEARCHMESSAGE,
    SET_CART,
    SET_TOKEN,
    CLEAR_CART,
} from "./constrants";

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

export const setToken = (payload) => ({
    type: SET_TOKEN,
    payload,
});

export const clearCart = (payload) => ({
    type: CLEAR_CART,
    payload,
});
