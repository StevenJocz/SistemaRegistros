import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

export async function GET() {
    try {
        const tipos = await prisma.tbl_Tipo_Documentos.findMany({
            orderBy: { id_tipo_documentos: 'asc' }
        });

        return NextResponse.json({ tipos });
    } catch (error) {
        console.error('Error al obtener tipos de documento:', error); // 👈 Esto es importante
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}