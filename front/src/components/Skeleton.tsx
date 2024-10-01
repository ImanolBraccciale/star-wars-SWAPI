import React from 'react';

interface SkeletonLoaderProps {
    title: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ title }) => (
    <div className="container mx-auto px-4 bg-black min-h-screen">
        <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
        
        {/* Contenedor de Filtros (Skeleton) */}
        <div className="mb-4 p-4 bg-gray-800 rounded-lg animate-pulse">
            <h2 className="text-xl font-bold text-white mb-2">
                <div className="h-6 bg-gray-700 rounded w-1/2 mb-2"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="text-white">
                        <div className="h-4 bg-gray-700 rounded mb-1"></div>
                    </label>
                    <select
                        name="gender"
                        className="w-full p-2 mt-1 rounded-md bg-gray-900 text-white animate-pulse"
                    >
                        <option value="all" disabled>...</option>
                    </select>
                </div>
                
                <div>
                    <label className="text-white">
                        <div className="h-4 bg-gray-700 rounded mb-1"></div>
                    </label>
                    <input
                        type="number"
                        name="height"
                        placeholder="Altura (cm)"
                        className="w-full p-2 mt-1 rounded-md bg-gray-900 text-white animate-pulse"
                    />
                </div>
                
                <div>
                    <label className="text-white">
                        <div className="h-4 bg-gray-700 rounded mb-1"></div>
                    </label>
                    <input
                        type="number"
                        name="birthYear"
                        placeholder="Año de nacimiento"
                        className="w-full p-2 mt-1 rounded-md bg-gray-900 text-white animate-pulse"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition animate-pulse"
                >
                    <div className="h-4 bg-gray-700 rounded w-24"></div>
                </button>
                <button
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition animate-pulse"
                >
                    <div className="h-4 bg-gray-700 rounded w-24"></div>
                </button>
            </div>
        </div>

        {/* Skeleton de Carga */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 26 }).map((_, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-800 animate-pulse">
                    <div className="h-7 bg-gray-700 rounded mb-2"></div>
                </div>
            ))}
        </div>
    </div>
);

export default SkeletonLoader;
