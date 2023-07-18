import React from 'react';

type PaginationProps = {
    current: number;
    total: number;
    first: number;
    onPaginate: (page: number) => void;
};

const Pagination = (props: PaginationProps) => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li
                    className={
                        'page-item' +
                        (props.current === props.first ? ' disabled' : '')
                    }
                >
                    <a
                        className="page-link"
                        href="#"
                        onClick={() => props.onPaginate(props.current + 1)}
                    >
                        Назад
                    </a>
                </li>
                <li
                    className={
                        'page-item' +
                        (props.current === props.total ? ' disabled' : '')
                    }
                >
                    <a
                        className="page-link"
                        href="#"
                        onClick={() => props.onPaginate(props.current + 1)}
                    >
                        Вперед
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
