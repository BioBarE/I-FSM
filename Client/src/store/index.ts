import  { configureStore } from '@reduxjs/toolkit';
import {
    TypedUseSelectorHook,
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
} from 'react-redux';
import {rest} from "../slices/api/api";
import {fsm} from "../slices/fsm/fsm";
export const store = configureStore({
    reducer: {
        [rest.reducerPath]: rest.reducer,
        [fsm.reducerPath]: fsm.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rest.middleware),
})


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();