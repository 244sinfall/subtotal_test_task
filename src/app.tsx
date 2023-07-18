import React, { useEffect } from 'react';
import './style.css';
import { useGetLaunchesByPageQuery } from './model/model';
const App = () => {
    const { data, error, isLoading } = useGetLaunchesByPageQuery('1');
    useEffect(() => {
        console.log(data);
    }, [data]);
    return <div>Hello worldzzz</div>;
};

export default App;
