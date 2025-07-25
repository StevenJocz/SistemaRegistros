import {
    IoHomeOutline,
    IoPersonOutline
} from 'react-icons/io5';

export const RoutesAdmin: Record<string, Route> = {
    INICIO: {
        path: '/dashboard',
        name: 'Inicio',
        icon: IoHomeOutline
    },
    
    ESTUDIANTE: {
        path: '/dashboard/personas',
        name: 'Personas',
        icon: IoPersonOutline
    }
};

export interface Route {
    path: string;
    name: string;
    icon: React.ElementType;
}
