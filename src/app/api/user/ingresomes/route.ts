import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';


export async function GET() {
    try {
        const fechaInicio = new Date();
        fechaInicio.setDate(1); // Primer día del mes
        fechaInicio.setHours(0, 0, 0, 0);

        const fechaFin = new Date();
        fechaFin.setMonth(fechaFin.getMonth() + 1, 0); // Último día del mes
        fechaFin.setHours(23, 59, 59, 999);

        const cantidad = await prisma.tbl_Registros_Ingreso.count({
            where: {
                d_fecha_hora_ingreso: {
                    gte: fechaInicio,
                    lte: fechaFin,
                },
            },
        });
        return NextResponse.json({ cantidad });
    } catch (error) {
        console.error('Error al contar ingresos del mes:', error);
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}