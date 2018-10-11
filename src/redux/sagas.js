import {
    call,
    put,
    takeEvery
} from 'redux-saga/effects';
import {
// eslint-disable-next-line no-unused-vars
    actions
} from 'react-redux-form';
import {
    Types as ItemTypes,
    Creators as ItemActions
} from './reducers/Items';
import createAPI from './api';

// Construct API
const api = createAPI('api/');

function * getItems(api, action){
    try{
        let response = yield call(api.getItems);
        if(response && response.ok){
            console.log(response.data);
            yield put(ItemActions.get_items_success({'items': response.data}));
        }
    } catch (e) {
        yield put(ItemActions.get_items_failure(e.toString()));
    }
}

/* ------------- Connect Types To Sagas ------------- */
export default function * root () {
    yield [
        takeEvery(ItemTypes.GET_ITEMS_REQUEST, getItems, api),
    ];
}
