import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const getUsuarioPorDocumento = async (documento: string) => {
    try {
        const response = await fetch(`/api/user?documento=${documento}`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'No registrado');
        }

        return data.persona;
    } catch (error: any) {
        return null;
    }
};

export const getUsuario = async () => {
    const token = Cookies.get('token');

    if (!token) {
        return null;
    }

    try {
        const decoded: any = jwtDecode(token);
        const response = await fetch(`/api/user?documento=${decoded.documento}`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'No registrado');
        }

        return data.persona;
    } catch (error: any) {
        return null;
    }
};


export const getTipoDocumento = async () => {
    try {
        const response = await fetch(`/api/tipodocumento`);

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener tipos de documento');
        }

        return data.tipos; // ✅ Aquí el campo correcto es tipos
    } catch (error: any) {
        console.error('Error en getTipoDocumento:', error.message);
        return null;
    }
};

export const getPaises = async () => {
    try {
        const response = await fetch('/api/paises');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener países');
        }

        return data.paises;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};


export const registrarPersona = async (datos: {
    s_nombres: string;
    s_apellido_uno: string;
    s_apellido_dos?: string;
    id_tipo_documento: number;
    s_documento: string;
    d_fecha_nacimiento: Date; 
    in_edad: number;
    s_telefono: number;
    id_pais: number;
    s_residencia: string;
}) => {
    try {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al registrar persona');
        }

        return data.persona;
    } catch (error: any) {
        console.error('Error al registrar persona:', error.message);
        return null;
    }
};



