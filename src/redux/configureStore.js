/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import reducer , { Creators as ReduxActions} from './reducers/index';
import saga from './sagas';

// Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Add middleware enhancers
const composeEnhancers = composeWithDevTools({
    actionCreators: ReduxActions
});

export default function configureStore () {
    // Build Redux Store
    const store = createStore(
        combineReducers({
            reducer
        }),
        composeEnhancers(
            // Apply saga middleware
            applyMiddleware(sagaMiddleware)
        )
    );
    // run the root saga
    sagaMiddleware.run(saga);
    return store;
}