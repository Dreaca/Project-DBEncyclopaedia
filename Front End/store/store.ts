import {configureStore, createStore} from "@reduxjs/toolkit";
import BookSlice from "../reducers/BookSlice";
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import CustomListSlice from "../reducers/CustomListSlice";

export const store = configureStore({
    reducer: {
        book : BookSlice,
        custom: CustomListSlice,
    },
    devTools: false,
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch;