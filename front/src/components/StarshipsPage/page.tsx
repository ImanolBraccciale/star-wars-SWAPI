"use client";
import React, { useEffect, useState } from 'react';
import { getStarships } from '@/hooks/api';
import { CreateStarshipDto } from '@/dtos/dtos';
import ExpandableCard from '../ExpandableCard';
import SkeletonLoader from '../Skeleton';
import { sessionStorageHandler } from '@/utils/sessionStorageHandler';
import StarshipFilter from '../Filters/FilterStarship';

const StarshipsPage = () => {
    const [starships, setStarships] = useState<CreateStarshipDto[]>([]);
    const [filteredStarships, setFilteredStarships] = useState<CreateStarshipDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [uniqueCrewValues, setUniqueCrewValues] = useState<number[]>([]);
    const [uniquePassengerValues, setUniquePassengerValues] = useState<number[]>([]);
    
    const [filters, setFilters] = useState({
        crew: 0,
        passengers: 0,
    });

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10; // Define cuántos elementos quieres mostrar por página

    const extractUniqueValues = (data: CreateStarshipDto[]) => {
        const crewSet = new Set<number>();
        const passengerSet = new Set<number>();

        data.forEach(starship => {
            crewSet.add(parseInt(starship.crew));
            passengerSet.add(parseInt(starship.passengers));
        });

        setUniqueCrewValues(Array.from(crewSet).sort((a, b) => a - b));
        setUniquePassengerValues(Array.from(passengerSet).sort((a, b) => a - b));
    };

    const fetchStarships = async (filters?: Record<string, string>) => {
        const localStarships = sessionStorageHandler.getItem('starships');
        if (localStarships && !filters) {
            setStarships(localStarships);
            setFilteredStarships(localStarships);
            extractUniqueValues(localStarships);
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const data = await getStarships(filters);  // Petición con filtros
            setStarships(data);
            setFilteredStarships(data);
            extractUniqueValues(data);
            sessionStorageHandler.setItem('starships', data);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Ha ocurrido un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStarships();
    }, []);

    const onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: parseInt(e.target.value),
        });
    };

    const applyFilters =async () => {
        // Enviar los filtros como parámetros en la petición GET
        const queryParams: Record<string, string> = {};
        if (filters.crew > 0) queryParams.crew = filters.crew.toString();
        if (filters.passengers > 0) queryParams.passengers = filters.passengers.toString();
        const data = await getStarships(queryParams);  // Petición con filtros
        setStarships(data);
    };

    const resetFilters = () => {
        setFilters({
            crew: 0,
            passengers: 0,
        });
        fetchStarships();  // Restablece los filtros haciendo la petición sin parámetros
    };

    if (loading) {
        return <SkeletonLoader title="Cargando Naves..." />;
    }
    if (error) return <div className="text-red-500">{error}</div>;

    // Cálculos de paginación
    const indexOfLastStarship = currentPage * itemsPerPage;
    const indexOfFirstStarship = indexOfLastStarship - itemsPerPage;
    const currentStarships = filteredStarships.slice(indexOfFirstStarship, indexOfLastStarship);
    const totalPages = Math.ceil(filteredStarships.length / itemsPerPage);

    return (
        <div className="container mx-auto px-4 bg-black min-h-screen">
            <h1 className="text-3xl font-bold text-white mb-4">Naves</h1>
            <StarshipFilter
                filters={filters}
                onFilterChange={onFilterChange}
                onApplyFilters={applyFilters}
                onResetFilters={resetFilters}
                uniqueCrewValues={uniqueCrewValues}
                uniquePassengerValues={uniquePassengerValues}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentStarships.map((starship) => (
                    <ExpandableCard
                        key={starship._id}
                        title={starship.name}
                        content={
                            <div>
                                <p className="mb-2">Modelo: {starship.model}</p>
                                <p className="mb-2">Clase: {starship.starship_class}</p>
                                <p className="mb-2">Fabricante: {starship.manufacturer}</p>
                                <p className="mb-2">Costo en créditos: {starship.cost_in_credits}</p>
                                <p className="mb-2">Longitud: {starship.length} m</p>
                                <p className="mb-2">Tripulación: {starship.crew}</p>
                                <p className="mb-2">Pasajeros: {starship.passengers}</p>
                                <p className="mb-2">Velocidad máxima en atmósfera: {starship.max_atmosphering_speed} km/h</p>
                                <p className="mb-2">Calificación de hipervelocidad: {starship.hyperdrive_rating}</p>
                                <p className="mb-2">MGLT: {starship.MGLT}</p>
                                <p className="mb-2">Capacidad de carga: {starship.cargo_capacity} kg</p>
                                <p className="mb-2">Consumibles: {starship.consumables}</p>
                                <p className="mb-2">URL: <a href={starship.url} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{starship.url}</a></p>
                                <p className="mb-2">Creado: {starship.created ? new Date(starship.created).toLocaleString() : 'No disponible'}</p>
                                <p className="mb-2">Editado: {starship.edited ? new Date(starship.edited).toLocaleString() : 'No disponible'}</p>
                            </div>
                        }
                    />
                ))}
            </div>

            {/* Controles de Paginación */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`mx-1 px-4 py-2 border rounded transition-colors duration-200 ${
                            currentPage === index + 1
                                ? 'bg-blue-500 text-white' // Estilo para la página activa
                                : 'bg-gray-700 text-white hover:bg-gray-600' // Estilo para las páginas inactivas
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StarshipsPage;
