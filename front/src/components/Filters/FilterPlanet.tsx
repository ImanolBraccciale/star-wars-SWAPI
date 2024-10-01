import React from 'react';

interface PlanetFilterProps {
    filters: {
        population: string;
        climate: string;
        terrain: string;
    };
    onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onApplyFilters: () => void;
    onResetFilters: () => void;
    uniquePopulationValues: string[];
    uniqueClimateValues: string[];
    uniqueTerrainValues: string[];
}

const PlanetFilter: React.FC<PlanetFilterProps> = ({
    filters,
    onFilterChange,
    onApplyFilters,
    onResetFilters,
    uniquePopulationValues,
    uniqueClimateValues,
    uniqueTerrainValues,
}) => {
    return (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-2">Filtrar Planetas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="text-white">Población</label>
                    <select
                        name="population"
                        value={filters.population}
                        onChange={onFilterChange}
                        className="w-full p-2 mt-1 rounded-md bg-gray-900 text-white"
                    >
                        <option value="">Cualquiera</option>
                        {uniquePopulationValues.map((population, index) => (
                            <option key={index} value={population}>{population}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-white">Clima</label>
                    <select
                        name="climate"
                        value={filters.climate}
                        onChange={onFilterChange}
                        className="w-full p-2 mt-1 rounded-md bg-gray-900 text-white"
                    >
                        <option value="">Cualquiera</option>
                        {uniqueClimateValues.map((climate, index) => (
                            <option key={index} value={climate}>{climate}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-white">Terreno</label>
                    <select
                        name="terrain"
                        value={filters.terrain}
                        onChange={onFilterChange}
                        className="w-full p-2 mt-1 rounded-md bg-gray-900 text-white"
                    >
                        <option value="">Cualquiera</option>
                        {uniqueTerrainValues.map((terrain, index) => (
                            <option key={index} value={terrain}>{terrain}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
                <button onClick={onApplyFilters} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Aplicar Filtros</button>
                <button onClick={onResetFilters} className="px-4 py-2 bg-gray-600 text-white rounded-lg">Resetear Filtros</button>
            </div>
        </div>
    );
};

export default PlanetFilter;
