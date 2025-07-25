'use client';
import React, { useState } from 'react';
import Button from '@/components/button/Buttton';
import style from './Entrada.module.css';
import { getUsuarioPorDocumento } from './Entrada.service';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import AddPersona from './AddPersona';

interface Props {
    recargar: () => void;
}

const Entrada : React.FC<Props> = ({ recargar }) =>  {
    const [documento, setDocumento] = useState('');
    const [usuario, setUsuario] = useState<any | null>(null);
    const [estado, setEstado] = useState('');
    const [tipoEstado, setTipoEstado] = useState(1);
    const [add, setAdd] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEstado('');
        setUsuario(null);

        if (!documento.trim()) {
            setEstado('Por favor, ingresa un documento válido');
            setTipoEstado(1);
            return;
        }

        const data = await getUsuarioPorDocumento(documento.trim());

        if (data) {
            setUsuario(data);
            setDocumento('');
            recargar();
        } else {
            setEstado('No registrado o no encontrado');
            setTipoEstado(2);
        }
    };

    const handleAddPersona = () => {
        setAdd(!add);
        if (add) {
            setDocumento('');
            setTipoEstado(1);
            setEstado('Ingresa un documento para buscar');
            recargar();
        }
    };

    return (
        <div className={style.Admin_Widget_Bottom}>
            <div className={style.Admin_Widget_Bottom_Left}>
                <h2>Registro de entrada</h2>
                <div className={style.Card_Inscripcion}>
                    <form onSubmit={handleSubmit}>
                        <div className='Formulario_Input'>
                            <input
                                name="documento"
                                type="text"
                                placeholder="Documento"
                                value={documento}
                                onChange={(e) => setDocumento(e.target.value)}
                            />
                        </div>
                        <Button type={1} text='Entrar' />
                    </form>
                </div>
            </div>
            <div className={style.Admin_Widget_Bottom_Right}>
                <h2>Información</h2>
                {usuario ? (
                    <div>
                        <p><strong>Documento:</strong> {usuario.s_documento}</p>
                        <p><strong>Nombre:</strong> {usuario.s_nombres + ' ' + usuario.s_apellido_uno + ' ' + usuario.s_apellido_dos}</p>

                        <div className={style.AlertaTrue}>
                            <p><IoCheckmarkCircleSharp /> Entrada registrada</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <p>{estado || 'Ingresa un documento para buscar'}</p>
                        {tipoEstado === 2 &&
                            <Button type={2} text='Registrar' onClick={handleAddPersona} />
                        }
                    </>
                )}
            </div>
            {add && (
                <AddPersona onClose={handleAddPersona} documento={documento} />
            )

            }
        </div>
    );
};

export default Entrada;
