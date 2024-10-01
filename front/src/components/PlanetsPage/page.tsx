"use client";

import { useEffect, useState } from 'react';
import { getPlanets } from '@/hooks/api';
import ExpandableCard from '../ExpandableCard';
import { CreatePlanetDto } from '@/dtos/dtos';
import SkeletonLoader from '../Skeleton';
import { sessionStorageHandler } from '@/utils/sessionStorageHandler';
import PlanetFilter from '../Filters/FilterPlanet';

const PlanetsPage = () => {
    const [planets, setPlanets] = useState<CreatePlanetDto[]>([]);
    const [filteredPlanets, setFilteredPlanets] = useState<CreatePlanetDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [uniquePopulationValues, setUniquePopulationValues] = useState<string[]>([]);
    const [uniqueClimateValues, setUniqueClimateValues] = useState<string[]>([]);
    const [uniqueTerrainValues, setUniqueTerrainValues] = useState<string[]>([]);

    const [filters, setFilters] = useState({
        population: '',
        climate: '',
        terrain: '',
    });

    // Estado para paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Cambia el número de elementos por página según sea necesario

    const extractUniqueValues = (data: CreatePlanetDto[]) => {
        const populationSet = new Set<string>();
        const climateSet = new Set<string>();
        const terrainSet = new Set<string>();

        data.forEach(planet => {
            populationSet.add(planet.population);
            planet.climate.split(',').forEach(climate => climateSet.add(climate.trim()));
            planet.terrain.split(',').forEach(terrain => terrainSet.add(terrain.trim()));
        });

        setUniquePopulationValues(Array.from(populationSet));
        setUniqueClimateValues(Array.from(climateSet));
        setUniqueTerrainValues(Array.from(terrainSet));
    };

    const fetchPlanets = async (filters?: Record<string, string>) => {
        const localPlanets = sessionStorageHandler.getItem('planets');
        if (localPlanets && !filters) {
            setPlanets(localPlanets);
            setFilteredPlanets(localPlanets);
            extractUniqueValues(localPlanets);
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const data = await getPlanets(filters);
            setPlanets(data);
            setFilteredPlanets(data);
            extractUniqueValues(data);
            sessionStorageHandler.setItem('planets', data);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Ha ocurrido un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlanets();
    }, []);

    const onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const applyFilters = async () => {
        const queryParams: Record<string, string> = {};
        if (filters.population) queryParams.population = filters.population;
        if (filters.climate) queryParams.climate = filters.climate;
        if (filters.terrain) queryParams.terrain = filters.terrain;
        const data = await getPlanets(queryParams);
        setFilteredPlanets(data);
    };

    const resetFilters = () => {
        setFilters({
            population: '',
            climate: '',
            terrain: '',
        });
        fetchPlanets();
    };

    // Calcular los índices de los planetas a mostrar
    const indexOfLastPlanet = currentPage * itemsPerPage;
    const indexOfFirstPlanet = indexOfLastPlanet - itemsPerPage;
    const currentPlanets = filteredPlanets.slice(indexOfFirstPlanet, indexOfLastPlanet);

    // Cambiar de página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(filteredPlanets.length / itemsPerPage);

    if (loading) {
        return (
            <SkeletonLoader title="Cargando Planetas..." />
        );
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 bg-black min-h-screen">
            <h1 className="text-3xl font-bold text-white mb-4">Planetas</h1>
            <PlanetFilter
                filters={filters}
                onFilterChange={onFilterChange}
                onApplyFilters={applyFilters}
                onResetFilters={resetFilters}
                uniquePopulationValues={uniquePopulationValues}
                uniqueClimateValues={uniqueClimateValues}
                uniqueTerrainValues={uniqueTerrainValues}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPlanets.map((planet) => (
                    <ExpandableCard
                        key={planet._id}
                        title={planet.name}
                        content={
                            <div>
                                <p className="mb-2">Clima: {planet.climate}</p>
                                <p className="mb-2">Terreno: {planet.terrain}</p>
                                <p className="mb-2">Periodo de rotación: {planet.rotation_period}</p>
                                <p className="mb-2">Periodo orbital: {planet.orbital_period}</p>
                                <p className="mb-2">Diametro: {planet.diameter}</p>
                                <p className="mb-2">Gravedad: {planet.gravity}</p>
                                <p className="mb-2">Superficie acuosa: {planet.surface_water}</p>
                                <p className="mb-2">Población: {planet.population}</p>
                                <p className="mb-2">URL: <a href={planet.url} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{planet.url}</a></p>
                                <p className="mb-2">Creado: {planet.created ? new Date(planet.created).toLocaleString() : 'No disponible'}</p>
                                <p className="mb-2">Editado: {planet.edited ? new Date(planet.edited).toLocaleString() : 'No disponible'}</p>
                            </div>
                        }
                    />
                ))}
            </div>
     
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PlanetsPage;
