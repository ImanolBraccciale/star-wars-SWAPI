"use client";

import React, { useEffect, useState } from 'react';
import { getPeople } from '@/hooks/api';
import { CreatePeopleDto } from '@/dtos/dtos';
import ExpandableCard from '../ExpandableCard';
import SkeletonLoader from '../Skeleton';
import { sessionStorageHandler } from '@/utils/sessionStorageHandler';
import PeopleFilter from '../Filters/Filter';
import Pagination from '../Pagination'; // Asegúrate de importar el componente de paginación

const PeoplePage = () => {
  const [people, setPeople] = useState<CreatePeopleDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    gender: 'all',
    height: 0,
    birthYear: 0,
  });

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Puedes cambiar el número de elementos por página

  // Función para obtener personas
  const fetchPeople = async () => {
    const localPeople = sessionStorageHandler.getItem('people');
    if (localPeople) {
      setPeople(localPeople);
      setLoading(false);
      return;
    }
    try {
      const data = await getPeople();
      setPeople(data);
      sessionStorageHandler.setItem('people', data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Ha ocurrido un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name === 'height' ? Number(value) : value,
    }));
  };

  const applyFilters = async () => {
    const validFilters: { [key: string]: string } = {};

    if (filters.gender !== 'all') {
      validFilters.gender = filters.gender;
    }
    if (filters.height > 0) {
      validFilters.height = filters.height.toString();
    }
    if (filters.birthYear > 0) {
      validFilters.birth_year = `${filters.birthYear}BBY`;
    }

    // Obtener las personas filtradas
    const filteredPeople = await getPeople(validFilters);
    setPeople(filteredPeople); // Aquí se actualiza el estado con los datos filtrados
    setCurrentPage(1)
  };

  const resetFilters = () => {
    setFilters({
      gender: 'all',
      height: 0,
      birthYear: 0,
    });
    fetchPeople(); // Vuelve a obtener todas las personas sin filtros
  };

  // Lógica de paginación
  const indexOfLastPerson = currentPage * itemsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - itemsPerPage;
  const currentPeople = people.slice(indexOfFirstPerson, indexOfLastPerson);

  const totalPages = Math.ceil(people.length / itemsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <SkeletonLoader title="Cargando Personas..." />;
  }
  if (error) return <div className="text-red-500">{error}</div>;
  
  const handleCardToggle = (id: string) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id)); // Cierra si es el mismo, abre si es diferente
};
  return (
    <div className="container mx-auto px-4 bg-black">
      <h2 className="text-3xl font-bold text-white mb-4">Personas</h2>

      <PeopleFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={applyFilters}
        onResetFilters={resetFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentPeople.map((person) => (
          <ExpandableCard
            key={person._id}
            title={person.name}
            content={
              <div>
                <p className="mb-2">Año de nacimiento: {person.birth_year}</p>
                <p className="mb-2">Color de ojos: {person.eye_color}</p>
                <p className="mb-2">Género: {person.gender}</p>
                <p className="mb-2">Color de cabello: {person.hair_color}</p>
                <p className="mb-2">Altura: {person.height} cm</p>
                <p className="mb-2">Masa: {person.mass} kg</p>
                <p className="mb-2">Color de piel: {person.skin_color}</p>
                <p className="mb-2">Mundo natal: {person.homeworld || 'Desconocido'}</p>
                <p className="mb-2">URL: <a href={person.url} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{person.url}</a></p>
                <p className="mb-2">Creado: {person.created ? new Date(person.created).toLocaleString() : 'No disponible'}</p>
                <p className="mb-2">Editado: {person.edited ? new Date(person.edited).toLocaleString() : 'No disponible'}</p>
              </div>
            }
            isExpanded={expandedCardId === person._id} 
            onToggle={() => handleCardToggle(person._id)} 
          />
        ))}
      </div>

       <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />

    </div>
  );
};

export default PeoplePage;
