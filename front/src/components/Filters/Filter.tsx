import React from 'react';

interface PeopleFilterProps {
    filters: {
        gender: string;
        height: number;
        birthYear: number;
    };
    onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onApplyFilters: () => void;
    onResetFilters: () => void;
}

const PeopleFilter: React.FC<PeopleFilterProps> = ({
    filters,
    onFilterChange,
    onApplyFilters,
    onResetFilters
}) => {
    return (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-2">Filtrar Personas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="text-white">Género</label>
                    <select
                        name="gender"
                        value={filters.gender}
                        onChange={onFilterChange}
                        className="w-full p-2 mt-1 rounded-md bg-gray-900 text-white"
                    >
                        <option value="all">Todos</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="n/a">N/A</option>
                    </select>
                </div>
                
                <div>
                    <label className="text-white">Altura (cm)</label>
                    <input
                        type="number"
                        name="height"
                        value={filters.height}
                        onChange={onFilterChange}
                        placeholder="Altura (cm)"
                        className="w-full p-2 mt-1 rounded-md bg-gray-900 text-white"
                        min={0}
                        max={400}
                    />
                </div>
                
                <div>
                    <label className="text-white">Año de Nacimiento</label>
                    <input
                        type="number"
                        name="birthYear"
                        value={filters.birthYear}
                        onChange={onFilterChange}
                        placeholder="Año de nacimiento"
                        className="w-full p-2 mt-1 rounded-md bg-gray-900 text-white"
                        min={0}
                        max={200}
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

export default PeopleFilter;
