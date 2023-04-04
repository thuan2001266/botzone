import {
    SET_RELOAD,
    SET_SEARCH,
    SET_SEARCHMESSAGE,
    SET_CART,
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

export const setRefreshToken = (payload) => ({
    type: SET_REFRESHTOKEN,
    payload,
});

export const clearCart = (payload) => ({
    type: CLEAR_CART,
    payload,
});

export const setPageLayer = (payload) => ({
    type: SET_FULL_PAGE_LAYER,
    payload,
});

export const setCRUDAction = (payload) => ({
    type: SET_CRUD_ACTION,
    payload,
});
