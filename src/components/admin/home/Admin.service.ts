import { ObjectWidget } from "./Admin.model";
import { IoBook, IoPeopleSharp } from 'react-icons/io5'


export const getCantidadPersonas = async () => {
    try {
        const response = await fetch('/api/user/cantidad');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener cantidad de personas');
        }

        return data.total;
    } catch (error: any) {
        console.error('Error al obtener cantidad de personas:', error.message);
        return 0;
    }
};


export const getCantidadIngresosMesActual = async () => {
    try {
        const response = await fetch('/api/user/ingresomes');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener ingresos del mes');
        }

        console.log('Cantidad de ingresos del mes:', data.cantidad);
        return data.cantidad;
    } catch (error: any) {
        console.error('Error al obtener ingresos del mes:', error.message);
        return 0;
    }
};

export const getIngresosUltimosMeses = async () => {
    try {
        const response = await fetch('/api/user/ingresomeses');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener ingresos mensuales');
        }

        return data as { id: number; nombre: string; total: number }[];
    } catch (error: any) {
        console.error('Error al obtener ingresos mensuales:', error.message);
        return [];
    }
};
export const fetchWidget = async () => {
    const [inscripciones, personas, ingresos] = await Promise.all([
        getIngresosUltimosMeses(),
        getCantidadPersonas(),
        getCantidadIngresosMesActual()
    ]);

    const Widget: ObjectWidget = {
        inscripciones, 
        total: [
            {
                id: 1,
                nombre: "Personas registradas",
                valor: personas,
                texto: "Total de personas registradas.",
                icono: IoPeopleSharp
            },
            {
                id: 2,
                nombre: "Total de entradas",
                valor: ingresos,
                texto: "Total de entradas.",
                icono: IoBook
            }
        ]
    };

    return Widget;
};