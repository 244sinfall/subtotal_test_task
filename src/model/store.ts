import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Launch } from './model.types';
import api from './model';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

type LaunchesState = {
    launches: Launch[];
    page: number;
    sortField: keyof Launch;
    sortDirection: 'asc' | 'desc';
};

const defaultLaunchesState: LaunchesState = {
    launches: [],
    page: 1,
    sortField: 'date_unix',
    sortDirection: 'desc',
};

const launchesReducer = createSlice({
    name: 'launches',
    initialState: defaultLaunchesState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setSort: (state, action: PayloadAction<keyof Launch>) => {
            if (state.sortField === action.payload) {
                state.sortDirection =
                    state.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                state.sortDirection = 'desc';
                state.sortField = action.payload;
            }
            state.page = 1;
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
export const { setPage, setSort } = launchesReducer.actions;
export const selectParams = (state: RootState) => ({
    page: state.launches.page,
    sortField: state.launches.sortField,
    sortDirection: state.launches.sortDirection,
});

export default store;
