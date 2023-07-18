import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Launch } from './model.types';
import api from './model';

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
    reducers: {},
});

const store = configureStore({
    reducer: {
        launches: launchesReducer.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

// type RootState = ReturnType<typeof store.getState>;
//
// type AppDispatch = typeof store.dispatch;

// const useAppDispatch: () => AppDispatch = useDispatch;
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const {} = launchesReducer.actions;
// export const selectLaunches = (state: RootState) => state.launches;

export default store;
