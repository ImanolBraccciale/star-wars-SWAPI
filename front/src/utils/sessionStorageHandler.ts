export const sessionStorageHandler = {
    // almacena en sessionStorage
    setItem: (key: string, data: any) => {
        try {
            sessionStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error("Error al almacenar en sessionStorage:", error);
        }
    },

    // recupera
    getItem: (key: string) => {
        try {
            const data = sessionStorage.getItem(key);
            return data ? JSON.parse(data) : null;  
        } catch (error) {
            console.error("Error al recuperar de sessionStorage:", error);
            return null;
        }
    },

    // limpia uno
    removeItem: (key: string) => {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error("Error al eliminar de sessionStorage:", error);
        }
    },

    // limpia todos
    clear: () => {
        try {
            sessionStorage.clear();
        } catch (error) {
            console.error("Error al limpiar sessionStorage:", error);
        }
    }
};
