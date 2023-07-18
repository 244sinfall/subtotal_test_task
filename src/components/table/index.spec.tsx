import React, { ReactNode } from 'react';
import MyTable from './index';
import { describe, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

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

type TestData = {
    id: number;
    name: string;
    age: number;
};

const testData: TestData[] = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 40 },
];

const testOptions: TableProps<TestData>['options'] = {
    id: { title: 'ID', toDisplay: (item) => item.id.toString() },
    name: { title: 'Name', toDisplay: (item) => item.name },
    age: { title: 'Age', toDisplay: (item) => item.age.toString() },
};

describe('MyTable', () => {
    it('renders table headers correctly', () => {
        render(<MyTable data={testData} options={testOptions} />);

        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Age')).toBeInTheDocument();
    });

    it('renders table data correctly', () => {
        render(<MyTable data={testData} options={testOptions} />);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('25')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('Jane')).toBeInTheDocument();
        expect(screen.getByText('30')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
        expect(screen.getByText('40')).toBeInTheDocument();
    });

    it('calls onHeaderClick when a header is clicked', () => {
        const onHeaderClick = jest.fn();
        render(
            <MyTable
                data={testData}
                options={testOptions}
                onHeaderClick={onHeaderClick}
            />
        );
        const nameHeader = screen.getByText('Name');
        nameHeader.click();
        expect(onHeaderClick).toHaveBeenCalledWith('name');
    });
});
