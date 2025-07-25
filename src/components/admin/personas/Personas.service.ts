export const getPersonas = async () => {
    try {
        const response = await fetch(`/api/user/personas`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'No registrado');
        }

        return data.personas;
    } catch (error: any) {
        return null;
    }
};