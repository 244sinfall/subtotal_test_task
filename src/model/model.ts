import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Launch } from './model.types';
import DefaultApiQueryParams from './query';

const api = createApi({
    reducerPath: 'spacexApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.spacexdata.com/v4/launches/query',
    }),
    endpoints: (builder) => ({
        getLaunchesByPage: builder.query<Launch[], string>({
            query: (page: string) => {
                const intPage = parseInt(page);
                if (isNaN(intPage)) throw new Error('Page cannot be NaN');
                return {
                    url: '',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: {
                        ...DefaultApiQueryParams,
                        options: {
                            ...DefaultApiQueryParams.options,
                            page: intPage,
                        },
                    },
                };
            },
            transformResponse: (rawResult: { docs: Launch[] }, meta) =>
                rawResult.docs,
        }),
    }),
});
export const { useGetLaunchesByPageQuery } = api;

export default api;
