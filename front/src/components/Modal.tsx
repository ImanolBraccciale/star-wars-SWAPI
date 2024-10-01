import { CreateFilmDto, CreatePeopleDto, CreatePlanetDto, CreateStarshipDto } from '@/dtos/dtos';
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: CreateStarshipDto | CreatePlanetDto | CreateFilmDto | CreatePeopleDto | null; // Ajusta según tus datos
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null; // No renderiza si no está abierto o no hay datos

    // Función para renderizar las propiedades del objeto
    const renderData = () => {
        if ('model' in data) { // Propiedad única para CreateStarshipDto
            return (
                <div className="mb-4">
                    <h3 className="font-semibold text-lg">Nave espacial Encontrada:</h3>
                    <ul className="list-disc list-inside">
                        <li><strong>Modelo:</strong> {data.model}</li>
                        <li><strong>Clase:</strong> {data.starship_class}</li>
                        <li><strong>Fabricante:</strong> {data.manufacturer}</li>
                        <li><strong>Costo en créditos:</strong> {data.cost_in_credits}</li>
                        <li><strong>Longitud:</strong> {data.length} m</li>
                        <li><strong>Tripulación:</strong> {data.crew}</li>
                        <li><strong>Pasajeros:</strong> {data.passengers}</li>
                        <li><strong>Velocidad máxima en atmósfera:</strong> {data.max_atmosphering_speed} km/h</li>
                        <li><strong>Calificación de hipervelocidad:</strong> {data.hyperdrive_rating}</li>
                        <li><strong>MGLT:</strong> {data.MGLT}</li>
                        <li><strong>Capacidad de carga:</strong> {data.cargo_capacity} kg</li>
                        <li><strong>Consumibles:</strong> {data.consumables}</li>
                        <li><strong>URL:</strong> <a href={data.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{data.url}</a></li>
                        <li><strong>Creado:</strong> {data.created ? new Date(data.created).toLocaleString() : 'No disponible'}</li>
                        <li><strong>Editado:</strong> {data.edited ? new Date(data.edited).toLocaleString() : 'No disponible'}</li>
                    </ul>
                </div>
            );
        }
        if ('climate' in data) { // Propiedad única para CreatePlanetDto
            return (
                <div className="mb-4">
                    <h3 className="font-semibold text-lg">Planeta Encontrado:</h3>
                    <ul className="list-disc list-inside">
                        <li><strong>Clima:</strong> {data.climate}</li>
                        <li><strong>Terreno:</strong> {data.terrain}</li>
                        <li><strong>Periodo de rotación:</strong> {data.rotation_period}</li>
                        <li><strong>Periodo orbital:</strong> {data.orbital_period}</li>
                        <li><strong>Diámetro:</strong> {data.diameter}</li>
                        <li><strong>Gravedad:</strong> {data.gravity}</li>
                        <li><strong>Superficie acuosa:</strong> {data.surface_water}</li>
                        <li><strong>Población:</strong> {data.population}</li>
                        <li><strong>URL:</strong> <a href={data.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{data.url}</a></li>
                        <li><strong>Creado:</strong> {data.created ? new Date(data.created).toLocaleString() : 'No disponible'}</li>
                        <li><strong>Editado:</strong> {data.edited ? new Date(data.edited).toLocaleString() : 'No disponible'}</li>
                    </ul>
                </div>
            );
        }
        if ('episode_id' in data) { // Propiedad única para CreateFilmDto
            return (
                <div className="mb-4">
                    <h3 className="font-semibold text-lg">Película Encontrada:</h3>
                    <ul className="list-disc list-inside">
                        <li><strong>Episode ID:</strong> {data.episode_id}</li>
                        <li><strong>Director:</strong> {data.director}</li>
                        <li><strong>Productor:</strong> {data.producer}</li>
                        <li><strong>Fecha de lanzamiento:</strong> {data.release_date ? new Date(data.release_date).toLocaleString() : 'No disponible'}</li>
                        <li><strong>URL:</strong> <a href={data.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{data.url}</a></li>
                    </ul>
                </div>
            );
        }
        if ('birth_year' in data) { // Propiedad única para CreatePeopleDto
            return (
                <div className="mb-4">
                    <h3 className="font-semibold text-lg">Personaje Encontrado:</h3>
                    <ul className="list-disc list-inside">
                        <li><strong>Año de nacimiento:</strong> {data.birth_year}</li>
                        <li><strong>Color de ojos:</strong> {data.eye_color}</li>
                        <li><strong>Género:</strong> {data.gender}</li>
                        <li><strong>Color de cabello:</strong> {data.hair_color}</li>
                        <li><strong>Altura:</strong> {data.height} cm</li>
                        <li><strong>Masa:</strong> {data.mass} kg</li>
                        <li><strong>Color de piel:</strong> {data.skin_color}</li>
                        <li><strong>Mundo natal:</strong> {data.homeworld || 'Desconocido'}</li>
                        <li><strong>URL:</strong> <a href={data.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{data.url}</a></li>
                        <li><strong>Creado:</strong> {data.created ? new Date(data.created).toLocaleString() : 'No disponible'}</li>
                        <li><strong>Editado:</strong> {data.edited ? new Date(data.edited).toLocaleString() : 'No disponible'}</li>
                    </ul>
                </div>
            );
        }
        return null; // Si no se reconoce el tipo, no renderiza nada
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="font-bold text-xl text-center mb-4">
                    {data instanceof CreateFilmDto ? data.title : data instanceof CreateStarshipDto ? data.name : data instanceof CreatePlanetDto ? data.name : data instanceof CreatePeopleDto ? data.name : ''}
                </h2>
                {renderData()} {/* Renderiza las propiedades específicas */}
                <button 
                    onClick={onClose} 
                    className="w-full mt-4 p-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default Modal;
