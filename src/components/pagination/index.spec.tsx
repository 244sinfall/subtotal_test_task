import React from 'react';
import { describe, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './index';

type PaginationProps = {
    current: number;
    total: number;
    first: number;
    onPaginate: (page: number) => void;
};
describe('Pagination', () => {
    const props: PaginationProps = {
        current: 2,
        total: 5,
        first: 1,
        onPaginate: jest.fn(),
    };

    it('renders correctly', () => {
        render(<Pagination {...props} />);
        expect(screen.getByText('Назад')).toBeInTheDocument();
        expect(screen.getByText('Вперед')).toBeInTheDocument();
    });

    it('calls onPaginate with current + 1 when Вперед button is clicked', () => {
        render(<Pagination {...props} />);
        const nextButton = screen.getByText('Вперед');
        fireEvent.click(nextButton);
        expect(props.onPaginate).toHaveBeenCalledWith(3);
    });

    it('calls onPaginate with current - 1 when Назад button is clicked', () => {
        render(<Pagination {...props} />);
        const prevButton = screen.getByText('Назад');
        fireEvent.click(prevButton);
        expect(props.onPaginate).toHaveBeenCalledWith(1);
    });

    it('disables Назад button when current is equal to first', () => {
        render(<Pagination {...props} current={1} first={1} />);
        const prevButton = screen.getByText('Назад').parentElement;
        expect(prevButton).toHaveClass('disabled');
    });

    it('disables Вперед button when current is equal to total', () => {
        render(<Pagination {...props} current={5} total={5} />);
        const nextButton = screen.getByText('Вперед').parentElement;
        expect(nextButton).toHaveClass('disabled');
    });
});
