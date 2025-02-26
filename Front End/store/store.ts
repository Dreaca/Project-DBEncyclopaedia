import {configureStore, createStore} from "@reduxjs/toolkit";
import BookSlice from "../reducers/BookSlice";
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

export const store = configureStore({
    reducer: {
        book : BookSlice,
    },
    devTools: false,
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),
});
export type AppDispatch = typeof store.dispatch;