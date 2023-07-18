import React from 'react';
import './style.css';
import { useGetLaunchesByPageQuery } from './model/model';
import MyTable from './components/table';
import {
    selectPage,
    setPage,
    useAppDispatch,
    useAppSelector,
} from './model/store';
import Pagination from './components/pagination';
const App = () => {
    const dispatch = useAppDispatch();
    const page = useAppSelector(selectPage);
    const { data, isLoading } = useGetLaunchesByPageQuery(page);
    return (
        <>
            {isLoading && <p>Загрузка...</p>}
            {!isLoading && (
                <>
                    <MyTable
                        data={data.docs}
                        options={{
                            name: {
                                title: 'Миссия',
                                toDisplay: (entry) => entry.name,
                            },
                            details: {
                                title: 'Описание',
                                toDisplay: (entry) => entry.details,
                            },
                            rocket: {
                                title: 'Ракета',
                                toDisplay: (entry) => entry.rocket.name,
                            },
                            picture: {
                                title: 'Изображение',
                                toDisplay: (entry) => (
                                    <img
                                        src={entry.rocket.flickr_images[0]}
                                        alt={entry.rocket.name}
                                        height={200}
                                    />
                                ),
                                toHash: (entry) =>
                                    entry.rocket.flickr_images[0],
                            },
                            date_unix: {
                                title: 'Дата',
                                toDisplay: (entry) => {
                                    const date = new Date(
                                        entry.date_unix * 1000
                                    );
                                    const dateString =
                                        date.toLocaleDateString();
                                    const time = date.toLocaleTimeString();
                                    return `${dateString} ${time}`;
                                },
                            },
                        }}
                    />
                    <Pagination
                        current={page}
                        total={data.totalPages}
                        first={1}
                        onPaginate={(page) => dispatch(setPage(page))}
                    />
                </>
            )}
        </>
    );
};

export default App;
