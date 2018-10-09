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
    Types as ReduxTypes,
    Creators as Actions
} from './reducers/index';
import createAPI from './api';

// Construct API
const api = createAPI('/groceries/api/');

function * getItems(api, action){
    try{
        let response = yield call(api.getItems);
        if(response && response.ok){
            console.log(response.data);
            yield put(Actions.get_items_success({'items': response.data}));
        }
    } catch (e) {
        yield put(Actions.get_items_failure(e.toString()));
    }
}

/* ------------- Connect Types To Sagas ------------- */
export default function * root () {
    yield [
        takeEvery(ReduxTypes.GET_ITEMS_REQUEST, getItems, api),
    ];
}
