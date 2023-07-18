import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from './model.types';
import DefaultApiQueryParams from './query';

const api = createApi({
    reducerPath: 'spacexApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.spacexdata.com/v4/launches/query',
    }),
    endpoints: (builder) => ({
        getLaunchesByPage: builder.query<ApiResponse, number>({
            query: (page: number) => ({
                url: '',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    ...DefaultApiQueryParams,
                    options: {
                        ...DefaultApiQueryParams.options,
                        page: page,
                    },
                },
            }),
        }),
    }),
});
export const { useGetLaunchesByPageQuery } = api;

export default api;
