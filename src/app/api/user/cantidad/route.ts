import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

export async function GET() {
    try {
        const total = await prisma.tbl_Personas.count();

        return NextResponse.json({ total });
    } catch (error) {
        console.error('Error al contar personas:', error);
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}