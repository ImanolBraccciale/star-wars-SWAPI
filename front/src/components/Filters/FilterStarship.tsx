import React from 'react';

interface StarshipFilterProps {
    filters: {
        crew: number;
        passengers: number;
    };
    onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onApplyFilters: () => void;
    onResetFilters: () => void;
    uniqueCrewValues: number[];
    uniquePassengerValues: number[];
}

const StarshipFilter: React.FC<StarshipFilterProps> = ({
    filters,
    onFilterChange,
    onApplyFilters,
    onResetFilters,
    uniqueCrewValues,
    uniquePassengerValues,
}) => {
    return (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-2">Filtrar Naves</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-white">Tripulación</label>
                    <select
                        name="crew"
                        value={filters.crew}
                        onChange={onFilterChange}
                        className="w-full p-2 mt-1 rounded-md bg-gray-900 text-white"
                    >
                        <option value={0}>Cualquiera</option>
                        {uniqueCrewValues.map((value) => (
                            <option key={value} value={value}>
                                {value} {value === 1 ? 'Tripulante' : 'Tripulantes'}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-white">Pasajeros</label>
                    <select
                        name="passengers"
                        value={filters.passengers}
                        onChange={onFilterChange}
                        className="w-full p-2 mt-1 rounded-md bg-gray-900 text-white"
                    >
                        <option value={0}>Cualquiera</option>
                        {uniquePassengerValues.map((value) => (
                            <option key={value} value={value}>
                                {value} {value === 1 ? 'Pasajero' : 'Pasajeros'}
                            </option>
                        ))}
                    </select>
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

export default StarshipFilter;
