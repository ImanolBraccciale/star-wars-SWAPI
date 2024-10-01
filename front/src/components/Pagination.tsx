import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const renderPagination = () => {
        const pageButtons = [];
        const maxButtons = 5;

        let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
        const endPage = Math.min(startPage + maxButtons - 1, totalPages);

        if (endPage === totalPages && totalPages > maxButtons) {
            startPage = Math.max(totalPages - maxButtons + 1, 1);
        }

        // Agregar botón de flecha a la primera página
        if (currentPage > 1) {
            pageButtons.push(
                <button
                    key="first"
                    onClick={() => onPageChange(1)}
                    className="mx-1 px-4 py-2 border rounded transition-colors duration-200 bg-gray-700 text-white hover:bg-gray-600"
                >
                    &#8592; {/* Flecha a la izquierda */}
                </button>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`mx-1 px-4 py-2 border rounded transition-colors duration-200 ${
                        currentPage === i
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Agregar botón para ir a la última página si hay más páginas
        if (endPage < totalPages) {
            pageButtons.push(<span key="ellipsis" className="mx-1">...</span>);
            pageButtons.push(
                <button
                    onClick={() => onPageChange(totalPages)}
                    className={`mx-1 px-4 py-2 border rounded transition-colors duration-200 bg-gray-700 text-white hover:bg-gray-600`}
                >
                    {totalPages}
                </button>
            );
        }

        return pageButtons;
    };

    return (
        <div className="flex justify-center mt-4">
            {renderPagination()}
        </div>
    );
};

export default Pagination;
