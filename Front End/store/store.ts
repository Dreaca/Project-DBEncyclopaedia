import {configureStore, createStore} from "@reduxjs/toolkit";
import BookSlice from "../reducers/BookSlice";
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import CustomListSlice from "../reducers/CustomListSlice";
import UserSlice from "../reducers/UserSlice";

export const store = configureStore({
    reducer: {
        book : BookSlice,
        custom: CustomListSlice,
        user : UserSlice,
    },
    devTools: false,
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch;