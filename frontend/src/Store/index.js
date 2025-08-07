import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { TBSlice } from './Reducers/TBSlice';
import { MADSlice } from './Reducers/MADSlice';

const main = combineReducers({
  TB: TBSlice.reducer,
  MAD: MADSlice.reducer,
})

export default configureStore({
  reducer: {
    main: main,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
})