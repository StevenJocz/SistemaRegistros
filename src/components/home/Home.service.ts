import { Card, Certificados } from "@/models";

export const fetchCursosCard = (): Card[] => {
    return [
        {
            id: 1,
            title: 'Inglés A1: Introducción al Idioma',
            image: 'https://edteam-media.s3.amazonaws.com/courses/original/a548d03b-1b82-4412-b630-8c9841986470.png', // Ruta de la imagen
        },
        {
            id: 2,
            title: 'Inglés A2: Expresiones y Conversaciones Cotidianas',
            image: 'https://edteam-media.s3.amazonaws.com/courses/big/12c8d71c-a714-454f-929c-8c39ae52fd81.png', // Ruta de la imagen
        },

    ];
};

export const fetchNewCursosCard = (): Card[] => {
    return [
        {
            id: 1,
            title: 'Inglés A1: Gramática Básica',
            image: 'https://edteam-media.s3.amazonaws.com/courses/big/5e2aab04-d7f4-418a-8eb0-171194531d5d.png', // Ruta de la imagen
        },
        {
            id: 2,
            title: 'Inglés A1: Comprensión Auditiva y Lectura',
            image: 'https://edteam-media.s3.amazonaws.com/courses/big/18f85e62-e9dc-4114-9778-6944aaa7f485.png', // Ruta de la imagen
        },

    ];
};


export const fetchCertificados = (): Certificados[] => {
    return [
        // {
        //     id: 1,
        //     title: 'Inglés A1: Introducción al Idioma',
        //     image: 'https://edteam-media.s3.amazonaws.com/courses/original/a548d03b-1b82-4412-b630-8c9841986470.png', // Ruta de la imagen
        // }

    ];
};
