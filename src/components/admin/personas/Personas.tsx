'use client';
import React, { useEffect, useState } from 'react'
import { getPersonas } from './Personas.service';
import { Tabla } from '@/components/tabla';
import style from './Persona.module.css';
import { exportarExcel } from '@/utils/ExportarExcel';

const Personas = () => {
    const [data, setData] = useState<any | null>(null);

    useEffect(() => {
        handleData();
    }, []);


    const handleData = async () => {
        const personas = await getPersonas();
        setData(personas);
    };

    const handleExportar = () => {
        if (data && data.length > 0) {
            exportarExcel(data, 'personas');
        }
    };


    return (
        <div className={style.Personas}>
            <h2>Personas</h2>
            <p>En esta sección puedes ver las personas registradas.</p>
            <button onClick={handleExportar}>Exportar a Excel</button>
            <Tabla
                data={data}
            />
        </div>
    )
}

export default Personas