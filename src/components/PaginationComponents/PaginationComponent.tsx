import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import styles from "./PaginationComponent.module.css";

interface IProps {
    next: string | null;
    previous: string | null;
    count: number;
    step: number; //позже попробовать использовать шаг пагинации
}

const PaginationComponent: FC<IProps> = ({ next, previous, count, step }) => {
    const [query, setQuery] = useSearchParams({ offset: '0', limit: step.toString() });


    const currentOffset = Number(query.get('offset')) || 0;
    const currentPage = Math.floor(currentOffset / step) + 1;


    const totalPage = Math.ceil(count / step);

    const [arrPaginator, setArrPaginator] = useState<string[]>([]);

    useEffect(() => {
        // Обновляем массив страниц при изменении текущей страницы или общего количества страниц
        createArrPages(currentPage, totalPage);
    }, [currentPage, totalPage]);


    const changePage = (direction: 'next' | 'prev') => {
        let newOffset = currentOffset;

        if (direction === 'next' && next) {
            newOffset = Math.min(currentOffset + step, count - 1);
        } else if (direction === 'prev' && previous) {
            newOffset = Math.max(currentOffset - step, 0);
        }

        setQuery({ offset: newOffset.toString(), limit: step.toString() });
    };


    const createArrPages = (currentPage: number, totalPage: number) => {
        const pages: string[] = [];

        if (totalPage <= 7) {
            // Если страниц мало, показываем все
            for (let i = 1; i <= totalPage; i++) {
                pages.push(i.toString());
            }
        } else {
            // Логика показа страниц при большом количестве страниц
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) pages.push(i.toString());
                pages.push('...');
                pages.push(totalPage.toString());
            } else if (currentPage > totalPage - 4) {
                pages.push('1');
                pages.push('...');
                for (let i = totalPage - 4; i <= totalPage; i++) pages.push(i.toString());
            } else {
                pages.push('1');
                pages.push('...');
                pages.push((currentPage - 1).toString());
                pages.push(currentPage.toString());
                pages.push((currentPage + 1).toString());
                pages.push('...');
                pages.push(totalPage.toString());
            }
        }

        setArrPaginator(pages);
    };


    const goToPage = (page: number) => {
        const newOffset = (page - 1) * step;
        setQuery({ offset: newOffset.toString(), limit: step.toString() });
    };

    return (
        <div className={styles.paginatorBox}>
            <button
                className={styles.allPage}
                disabled={!previous}
                onClick={() => changePage('prev')}
            >
                &lt;
            </button>

            {arrPaginator.map((page, index) => (
                <button
                    key={index}
                    className={currentPage.toString() === page ? styles.currentPage : styles.allPage}
                    onClick={() => page !== '...' && goToPage(Number(page))}
                    disabled={page === '...'}
                >
                    {page}
                </button>
            ))}

            <button
                className={styles.allPage}
                disabled={!next}
                onClick={() => changePage('next')}
            >
                &gt;
            </button>
        </div>
    );
};

export default PaginationComponent;
