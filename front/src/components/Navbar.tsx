"use client";

import { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import { getFilms, getPeople, getPlanets, getStarships } from '@/hooks/api';
import Modal from './Modal'; // Asegúrate de importar el componente Modal

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<any[]>([]); // Almacena los resultados de la búsqueda
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
    const [selectedData, setSelectedData] = useState<any>(null); // Almacena los datos del objeto seleccionado

    // Función para manejar el cambio en la barra de búsqueda
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Función para ejecutar la búsqueda
    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            setResults([]);  
            return;
        }

        try {
            const services = [
                { fetchFunc: getPeople, filters: { name: searchTerm } },
                { fetchFunc: getStarships, filters: { name: searchTerm } },
                { fetchFunc: getPlanets, filters: { name: searchTerm } },
                { fetchFunc: getFilms, filters: { name: searchTerm } },
            ];

            let finalResult: any[] = [];

            for (const service of services) {
                const data = await service.fetchFunc(service.filters);

                const filteredResults = data.filter((item: { name?: string; title?: string }) => {
                    const searchValue = item.name ? item.name.toLowerCase() : item.title ? item.title.toLowerCase() : '';
                    return searchValue.includes(searchTerm.toLowerCase());
                });

                // Agregar resultados únicos a finalResult
                finalResult = [...finalResult, ...filteredResults.filter((item: { _id: string; }) => 
                    !finalResult.some(existingItem => existingItem._id === item._id)
                )];
            }

            console.log("Search results:", finalResult); // Mostramos los resultados en la consola
            setResults(finalResult);

        } catch (error) {
            console.error('Error fetching search results:', error);
            setResults([]);  
        }
    };

    const handleSelectChange = (selectedResult: any) => { // Reemplaza `YourResultType` con el tipo adecuado
       console.log("Resultado seleccionado:", selectedResult);
  
      // Aquí puedes abrir el modal y pasarle el objeto
      setIsModalOpen(true);
       setSelectedData(selectedResult);
       setResults([]); // Limpia los resultados para cerrar el dropdown
       setSearchTerm(''); // Opcional: limpia el campo de búsqueda
  };
  

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedData(null);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}  
                    className={styles.searchInput}
                />
                <button onClick={handleSearch} className={styles.searchButton}>
                    Buscar
                </button>
                {results.length > 0 && (
                    <div className={styles.dropdown}>
                        {results.map((result, index) => {
                            const displayName = result.name || result.title || "Sin título"; // Define el nombre a mostrar
                            return (
                                <div 
                                    key={result._id} 
                                    className={styles.dropdownItem} 
                                    onClick={() => handleSelectChange(result)}// Llama a la función con el valor seleccionado
                                >
                                    {displayName}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} data={selectedData} />
        </nav>
    );
};

export default Navbar;
