import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

export async function GET() {
    try {
        const paises = await prisma.tbl_Paises.findMany({
            orderBy: { id_pais: 'asc' } // Ordenar por el ID del país
        });

        return NextResponse.json({ paises });
    } catch (error) {
        console.error('Error al obtener países:', error);
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}
