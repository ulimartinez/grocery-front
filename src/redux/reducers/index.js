import { createActions, createReducer } from 'reduxsauce';

export const INITIAL_STATE = {
    items: [],
    fetching: false,
    success: true,
    error: undefined
};

export const { Types, Creators } = createActions({
    get_items_request: undefined,
    get_items_success: ['payload'],
    get_items_failure: ['payload']
});

export const request = (state, {data}) => {
    return {
        ...state,
        fetching: true,
        data,
        success: false,
        payload: undefined
    };
};

export const success = (state, action) => {
    const { payload } = action;
    return {
        ...state,
        fetching: false,
        success: true,
        error: false,
        ...payload
    };
};
export const failure = (state, action) => {
    const { payload } = action;
    return {
        ...state,
        fetching: false,
        success: false,
        error: true,
        payload
    };
};

const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ITEMS_REQUEST]: request,
    [Types.GET_ITEMS_SUCCESS]: success,
    [Types.GET_ITEMS_FAILURE]: failure
});
export default reducer;