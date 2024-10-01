"use client";

import React, { useEffect, useState } from 'react';
import { getFilms } from '@/hooks/api'; // Asegúrate de que esta función esté definida
import ExpandableCard from '../ExpandableCard';
import SkeletonLoader from '../Skeleton';
import { sessionStorageHandler } from '@/utils/sessionStorageHandler';
import { CreateFilmDto } from '@/dtos/dtos';
import FilmFilter from '../Filters/FilterFilm';
import Pagination from '../Pagination'; // Asegúrate de que la ruta sea correcta

const FilmPage = () => {
    const [films, setFilms] = useState<CreateFilmDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

    const [filters, setFilters] = useState({
        episode_id: 0,
        openingCrawl: '',
    });

    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filmsPerPage] = useState<number>(5); // Cambia este número según cuántas películas quieras mostrar por página

    const fetchFilms = async () => {
        const localFilms = sessionStorageHandler.getItem('films');
        if (localFilms) {
            setFilms(localFilms);
            setLoading(false);
            return;
        }
        try {
            const data = await getFilms();
            setFilms(data);
            sessionStorageHandler.setItem('films', data);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Ha ocurrido un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFilms();
    }, []);

    const applyFilters = () => {
        const filteredFilms = films.filter((film) => {
            const matchesEpisodeId = filters.episode_id > 0 ? film.episode_id === filters.episode_id : true;
            const matchesOpeningCrawl = filters.openingCrawl ? film.opening_crawl.includes(filters.openingCrawl) : true;

            return matchesEpisodeId && matchesOpeningCrawl;
        });
        setFilms(filteredFilms);
        setCurrentPage(1); // Reiniciar a la primera página al aplicar filtros
    };

    const resetFilters = () => {
        setFilters({
            episode_id: 0,
            openingCrawl: '',
        });
        fetchFilms(); // Vuelve a cargar todos los filmes
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: name === 'episode_id' ? Number(value) : value,
        }));
    };

    // Lógica de paginación
    const indexOfLastFilm = currentPage * filmsPerPage;
    const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
    const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);
    const totalPages = Math.ceil(films.length / filmsPerPage);

    if (loading) return <SkeletonLoader title="Cargando Películas..." />;
    if (error) return <div className="text-red-500">{error}</div>;
   
    const handleCardToggle = (id: string) => {
        setExpandedCardId((prevId) => (prevId === id ? null : id)); // Cierra si es el mismo, abre si es diferente
    };
    return (
        <div className="container mx-auto px-4 bg-black ">
            <h2 className="text-3xl font-bold text-white mb-4">Películas</h2>

             <FilmFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                onApplyFilters={applyFilters}
                onResetFilters={resetFilters}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentFilms.map((film) => (
                    <ExpandableCard
                        key={film._id} // Cambia esto si usas un identificador diferente
                        title={film.title}
                        content={
                            <div>
                                <p className="mb-2">Episode ID: {film.episode_id}</p>
                                <p className="mb-2">Director: {film.director}</p>
                                <p className="mb-2">Producer: {film.producer}</p>
                                <p className="mb-2">Fecha de lanzamiento: {film.release_date ? new Date(film.release_date).toLocaleString() : 'No disponible'}</p>
                                <p className="mb-2">URL: <a href={film.url} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{film.url}</a></p>
                            </div>
                        }
                        isExpanded={expandedCardId === film._id} // Comprueba si este card debe estar expandido
                        onToggle={() => handleCardToggle(film._id)} // Pasa la función de toggle
                       
                    />
                ))}
            </div>

            {/* Componente de Paginación */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage} // Actualiza la página actual al hacer clic en un número
            />
        </div>
    );
};

export default FilmPage;
