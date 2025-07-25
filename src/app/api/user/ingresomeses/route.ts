import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';


export async function GET() {
    try {
        const ahora = new Date();
        const resultados: { id: number; nombre: string; total: number }[] = [];

        // Obtener los últimos 5 meses
        for (let i = 4; i >= 0; i--) {
            const fecha = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1);
            const inicio = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
            const fin = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0, 23, 59, 59, 999);

            const cantidad = await prisma.tbl_Registros_Ingreso.count({
                where: {
                    d_fecha_hora_ingreso: {
                        gte: inicio,
                        lte: fin
                    }
                }
            });

            const nombreMes = fecha.toLocaleString('es-CO', { month: 'long' });

            resultados.push({
                id: fecha.getMonth() + 1, // id como número de mes (1-12)
                nombre: nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1), // Ej: "Enero"
                total: cantidad
            });
        }

        return NextResponse.json(resultados);
    } catch (error) {
        console.error('Error al obtener ingresos mensuales:', error);
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}