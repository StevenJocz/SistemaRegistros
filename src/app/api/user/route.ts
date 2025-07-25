import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const documento = searchParams.get('documento');

    if (!documento) {
        return NextResponse.json({ error: 'El documento es requerido' }, { status: 400 });
    }

    try {
        // Buscar la persona por documento
        const persona = await prisma.tbl_Personas.findFirst({
            where: { s_documento: documento }
        });

        if (!persona) {
            return NextResponse.json({ error: 'Persona no encontrada' }, { status: 404 });
        }

        // Registrar la hora de ingreso
        await prisma.tbl_Registros_Ingreso.create({
            data: {
                d_fecha_hora_ingreso: new Date(),
                id_persona: persona.id_personas,
                s_observaciones: 'Registro automático desde escáner'
            }
        });

        return NextResponse.json({ persona });
    } catch (error) {
        console.error('Error al consultar persona:', error);
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            s_nombres,
            s_apellido_uno,
            s_apellido_dos,
            id_tipo_documento,
            s_documento,
            d_fecha_nacimiento,
            in_edad,
            in_telefono,
            id_pais,
            s_residencia
        } = body;

        if (!s_nombres || !s_apellido_uno || !s_documento) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        // Crear la persona
        const nuevaPersona = await prisma.tbl_Personas.create({
            data: {
                s_nombres,
                s_apellido_uno,
                s_apellido_dos,
                id_tipo_documento,
                s_documento,
                d_fecha_nacimiento: new Date(d_fecha_nacimiento),
                in_edad,
                in_telefono,
                id_pais,
                s_residencia,
                d_fecha_registro: new Date()
            }
        });

        // Registrar ingreso automáticamente
        await prisma.tbl_Registros_Ingreso.create({
            data: {
                d_fecha_hora_ingreso: new Date(),
                id_persona: nuevaPersona.id_personas,
                s_observaciones: 'Registro automático al crear persona'
            }
        });

        return NextResponse.json({ persona: nuevaPersona }, { status: 201 });
    } catch (error) {
        console.error('Error al registrar persona:', error);
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}




