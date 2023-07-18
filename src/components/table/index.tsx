import React, { ReactNode, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import hash from 'object-hash';

type TableProps<T extends object> = {
    data: T[];
    options: {
        [K in string]: {
            title: string;
            toDisplay: (item: T) => ReactNode;
            toHash?: (item: T) => string;
        };
    };
    onHeaderClick?: (field: keyof T) => void;
};

const MyTable = <T extends object>(props: TableProps<T>) => {
    const headers = useMemo(() => {
        const data = [];
        for (const key in props.options) {
            if (
                Object.keys(props.data[0]).includes(key) &&
                props.onHeaderClick
            ) {
                data.push(
                    <th
                        className={'interactive_header'}
                        onClick={() => props.onHeaderClick(key as keyof T)}
                        key={key}
                    >
                        {props.options[key].title}
                    </th>
                );
            } else {
                data.push(<th key={key}>{props.options[key].title}</th>);
            }
        }
        return data;
    }, [props.options]);
    const tableData = props.data.map((entry) => {
        const data = [];
        const hashData = [];
        for (const key in props.options) {
            hashData.push(
                props.options[key].toHash
                    ? props.options[key].toHash(entry)
                    : props.options[key].toDisplay(entry)
            );
            data.push(
                <td key={hash(hashData[hashData.length - 1])}>
                    {props.options[key].toDisplay(entry)}
                </td>
            );
        }
        return <tr key={hash(hashData)}>{data}</tr>;
    });
    return (
        <Table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{tableData}</tbody>
        </Table>
    );
};

export default MyTable;
