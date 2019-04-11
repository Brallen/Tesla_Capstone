
import { createStore, combineReducers } from 'redux';
import reducers from '../../src/reducers/reducer.js';

//creating our store called store
export const store = createStore(
    combineReducers({
        state: reducers
    }),
);