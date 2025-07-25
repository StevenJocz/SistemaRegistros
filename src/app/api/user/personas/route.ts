import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export async function GET() {
    try {
        const personas = await prisma.tbl_Personas.findMany({
            orderBy: { id_personas: 'asc' },
        });

        const tipos = await prisma.tbl_Tipo_Documentos.findMany();
        const paises = await prisma.tbl_Paises.findMany();

        const personasFormateadas = personas.map(persona => {
            const tipo = tipos.find(t => t.id_tipo_documentos === persona.id_tipo_documento);
            const pais = paises.find(p => p.id_pais === persona.id_pais);

            // Validar que d_fecha_nacimiento no sea null
            const fechaNacimientoFormateada = persona.d_fecha_nacimiento
                ? format(new Date(persona.d_fecha_nacimiento), "dd 'de' MMMM 'de' yyyy", { locale: es })
                : 'No registrada';

            return {
                id: persona.id_personas,
                nombre: `${persona.s_nombres} ${persona.s_apellido_uno} ${persona.s_apellido_dos || ''}`.trim(),
                "tipo de documento": tipo?.s_nombre || 'No definido',
                documento: persona.s_documento,
                telefono: persona.in_telefono,
                "fecha de nacimiento": fechaNacimientoFormateada,
                edad: persona.in_edad,
                nacionalidad: pais?.s_nombre || 'No definido',
                residencia: persona.s_residencia,
            };
        });

        return NextResponse.json({ personas: personasFormateadas });
    } catch (error) {
        console.error('Error al obtener personas:', error);
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}
