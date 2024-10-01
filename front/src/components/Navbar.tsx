"use client";

import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';
import { getFilms, getPeople, getPlanets, getStarships } from '@/hooks/api';
import Modal from './Modal';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<any>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) return setResults([]);

        const services = [getPeople, getStarships, getPlanets, getFilms];
        const finalResults = await Promise.all(services.map(async (fetchFunc) => {
            const data = await fetchFunc({ name: searchTerm });
            return data.filter((item: { name?: string; title?: string }) =>
                (item.name || item.title || '').toLowerCase().includes(searchTerm.toLowerCase())
            );
        })).then(results => results.flat());

        setResults(Array.from(new Set(finalResults.map(item => item._id))) // Eliminar duplicados
            .map(id => finalResults.find(item => item._id === id)));
    };

    const handleSelectChange = (selectedResult: any) => {
        setIsModalOpen(true);
        setSelectedData(selectedResult);
        setResults([]);
        setSearchTerm('');
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setResults([]);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles.searchContainer} ref={dropdownRef}>
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
                        {results.map((result) => (
                            <div 
                                key={result._id} 
                                className={styles.dropdownItem} 
                                onClick={() => handleSelectChange(result)}
                            >
                                {result.name || result.title || "Sin título"}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedData} />
        </nav>
    );
};

export default Navbar;
