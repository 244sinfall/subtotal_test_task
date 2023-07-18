import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiParams, ApiResponse } from './model.types';
import DefaultApiQueryParams from './query';

const api = createApi({
    reducerPath: 'spacexApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.spacexdata.com/v4/launches/query',
    }),
    endpoints: (builder) => ({
        getLaunchesByPage: builder.query<ApiResponse, ApiParams>({
            query: (params: ApiParams) => ({
                url: '',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    ...DefaultApiQueryParams,
                    options: {
                        ...DefaultApiQueryParams.options,
                        sort: {
                            [params.sortField ?? 'date_unix']:
                                params.sortDirection ?? 'desc',
                        },
                        page: params.page,
                    },
                },
            }),
        }),
    }),
});
export const { useGetLaunchesByPageQuery } = api;

export default api;
