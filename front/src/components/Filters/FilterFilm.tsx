import React from 'react';

interface FilmFilterProps {
    filters: {
        episode_id: number;
        openingCrawl: string;
    };
    onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onApplyFilters: () => void;
    onResetFilters: () => void;
}

const FilmFilter: React.FC<FilmFilterProps> = ({
    filters,
    onFilterChange,
    onApplyFilters,
    onResetFilters
}) => {
    return (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-2">Filtrar Películas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-white">ID del Episodio</label>
                    <input
                        type="number"
                        name="episode_id"
                        value={filters.episode_id}
                        onChange={onFilterChange}
                        placeholder="ID del Episodio"
                        className="w-full p-2 mt-1 rounded-md bg-gray-900 text-white"
                        min={0}
                    />
                </div>
                
                <div>
                    <label className="text-white">Crawl Inicial</label>
                    <input
                        type="text"
                        name="openingCrawl"
                        value={filters.openingCrawl}
                        onChange={onFilterChange}
                        placeholder="Crawl Inicial"
                        className="w-full p-2 mt-1 rounded-md bg-gray-900 text-white"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
                <button
                    onClick={onApplyFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                >
                    Aplicar Filtros
                </button>
                <button
                    onClick={onResetFilters}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
                >
                    Resetear Filtros
                </button>
            </div>
        </div>
    );
};

export default FilmFilter;
