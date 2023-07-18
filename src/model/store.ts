import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Launch } from './model.types';
import api from './model';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

type LaunchesState = {
    launches: Launch[];
    page: number;
};

const defaultLaunchesState: LaunchesState = {
    launches: [],
    page: 1,
};

const launchesReducer = createSlice({
    name: 'launches',
    initialState: defaultLaunchesState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
});

const store = configureStore({
    reducer: {
        launches: launchesReducer.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const { setPage } = launchesReducer.actions;
export const selectPage = (state: RootState) => state.launches.page;

export default store;
