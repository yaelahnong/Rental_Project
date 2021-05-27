import { combineReducers, applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import user from '../reducers/user.reducers';
import mobil from '../reducers/mobil.reducers';
import transaksi from '../reducers/transaksi.reducers';
import detail_transaksi from '../reducers/detail_transaksi.reducers';
import rental_info from '../reducers/rental_info.reducers';

import view_detail_transaksi from '../reducers/v_detail_transaksi.reducers';

const rootReducer = combineReducers ({
    mobil,
    user,
    transaksi,
    detail_transaksi,
    view_detail_transaksi,
    rental_info,
})

const store = createStore(rootReducer, applyMiddleware(logger, promise));

export default store;