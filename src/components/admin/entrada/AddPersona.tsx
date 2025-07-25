"use client";

import { IoCloseCircle } from 'react-icons/io5';
import style from './Entrada.module.css';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { StyledDatePicker, StyledSelect, StyledTextField } from '@/utils/MaterialUI';
import ButtonSubmit from '@/components/button/ButtonSubmit';
import { useEffect, useState } from 'react';
import { getPaises, getTipoDocumento, registrarPersona } from './Entrada.service';
import { MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { calcularEdad } from '@/utils/CalcularEdad';
import { Dayjs } from 'dayjs';

interface Props {
    documento: string;
    onClose: () => void;
}

const AddPersona: React.FC<Props> = ({ onClose, documento }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tiposDocumentos, setTiposDocumentos] = useState<any | null>(null);
    const [paises, setTpaises] = useState<any | null>(null);

    const handleRegistrar = async (values: FormikValues) => {
        setIsLoading(true);

        try {
            const persona = await registrarPersona({
                s_nombres: values.nombre,
                s_apellido_uno: values.apellido_uno,
                s_apellido_dos: values.apellido_dos || '',
                id_tipo_documento: values.tipodocumento,
                s_documento: values.documento,
                d_fecha_nacimiento: new Date(values.fecha_nacimiento),
                in_edad: parseInt(values.edad),
                s_telefono: values.telefono,
                id_pais: parseInt(values.pais),
                s_residencia: values.residencia,
            });

            if (persona) {
                alert('Persona registrada correctamente');
                onClose();
            } else {
                alert('No se pudo registrar la persona');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            alert('Error al registrar la persona');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        let ejecutado = false;

        const cargarDatos = async () => {
            if (ejecutado) return;

            ejecutado = true;

            const [tipos, paises] = await Promise.all([
                getTipoDocumento(),
                getPaises()
            ]);

            setTiposDocumentos(tipos);
            setTpaises(paises);
        };

        cargarDatos();
    }, []);

    return (
        <div className={style.Add}>
            <div className={style.Add_Content}>
                <div className={style.Add_Content_Encabezado}>
                    <h2>Registrar Persona</h2>

                    <IoCloseCircle
                        className={style.Add_Content_Encabezado_Icono}
                        onClick={onClose}
                    />
                </div>
                <div className={style.AddText_informacion}>
                    <p>Para continuar, asegúrate de llenar todos los campos. ¡Son necesarios para completar el registro!</p>
                </div>

                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        nombre: '',
                        apellido_uno: '',
                        apellido_dos: '',
                        tipodocumento: '',
                        documento: documento || '',
                        fecha_nacimiento: null as Dayjs | null,
                        edad: '',
                        telefono: '',
                        pais: 0,
                        residencia: '',
                    }}
                    validate={(values) => {
                        let errors: any = {};

                        if (!values.nombre) errors.nombre = 'El campo nombre es obligatorio.';
                        if (!values.apellido_uno) errors.apellido_uno = 'El primer apellido es obligatorio.';
                        if (!values.tipodocumento) errors.tipodocumento = 'Debe seleccionar un tipo de documento.';
                        if (!values.documento) errors.documento = 'El número de documento es obligatorio.';
                        if (!values.fecha_nacimiento) errors.fecha_nacimiento = 'La fecha de nacimiento es obligatoria.';
                        if (!values.telefono) errors.telefono = 'El teléfono es obligatorio.';
                        if (!values.pais) errors.pais = 'Debe seleccionar un país.';
                        if (!values.residencia) errors.residencia = 'La residencia es obligatoria.';

                        return errors;
                    }}
                    onSubmit={handleRegistrar}
                >
                    {({ values, errors, setFieldValue, isSubmitting, isValid }) => (
                        <Form>
                            <div className='Formulario'>
                                <div className='Formulario_Input_Doble'>
                                    <StyledTextField
                                        name="nombre"
                                        label="Nombres"
                                        placeholder="Nombre"
                                        size="small"
                                        value={values.nombre}
                                        onChange={(e) => setFieldValue('nombre', e.target.value)}
                                    />
                                    <StyledTextField
                                        name="apellido_uno"
                                        label="Primer Apellido"
                                        placeholder="Primer Apellido"
                                        size="small"
                                        value={values.apellido_uno}
                                        onChange={(e) => setFieldValue('apellido_uno', e.target.value)}
                                    />
                                    <StyledTextField
                                        name="apellido_dos"
                                        label="Segundo Apellido"
                                        placeholder="Segundo Apellido"
                                        size="small"
                                        value={values.apellido_dos}
                                        onChange={(e) => setFieldValue('apellido_dos', e.target.value)}
                                    />
                                </div>
                                <div className='Formulario_Input_Doble'>
                                    <StyledSelect
                                        id="outlined-select-currency"
                                        select
                                        label="Tipo de documento"
                                        size="small"
                                        variant="outlined"
                                        value={values.tipodocumento}
                                        onChange={(e) => setFieldValue('tipodocumento', parseInt(e.target.value))}
                                    >
                                        <MenuItem value='0'>
                                            Seleccione
                                        </MenuItem>
                                        {tiposDocumentos?.map((tipo: any) => (
                                            <MenuItem key={tipo.id_tipo_documentos} value={tipo.id_tipo_documentos}>
                                                {tipo.s_nombre}
                                            </MenuItem>
                                        ))}
                                    </StyledSelect>
                                    <StyledTextField
                                        name="documento"
                                        label="Documento"
                                        placeholder="Documento"
                                        size="small"
                                        value={values.documento}
                                        onChange={(e) => setFieldValue('documento', e.target.value)}
                                    />
                                </div>
                                <div className='Formulario_Input_Doble'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <StyledDatePicker
                                                label="Fecha de Nacimiento"
                                                value={values.fecha_nacimiento}
                                                onChange={(value: unknown) => {
                                                    const date = value as Dayjs;
                                                    setFieldValue('fecha_nacimiento', date);
                                                    setFieldValue('edad', calcularEdad(date?.toDate() ?? null));
                                                }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>

                                </div>
                                <div className='Formulario_Input_Doble'>
                                    <StyledTextField
                                        name="edad"
                                        label="Edad"
                                        placeholder="Edad"
                                        size="small"
                                        type="number"
                                        value={values.edad}
                                        onChange={(e) => setFieldValue('edad', parseInt(e.target.value))}
                                    />

                                    <StyledTextField
                                        name="telefono"
                                        label="Teléfono"
                                        placeholder="Teléfono"
                                        size="small"
                                        type="number"
                                        value={values.telefono}
                                        onChange={(e) => setFieldValue('telefono', parseInt(e.target.value))}
                                    />
                                </div>
                                <div className='Formulario_Input_Doble'>
                                    <StyledSelect
                                        id="outlined-select-currency"
                                        select
                                        label="Nacionalidad"
                                        size="small"
                                        variant="outlined"
                                        value={values.pais}
                                        onChange={(e) => setFieldValue('pais', parseInt(e.target.value))}
                                    >
                                        <MenuItem value='0'>
                                            Seleccione
                                        </MenuItem>
                                        {paises?.map((tipo: any) => (
                                            <MenuItem key={tipo.id_pais} value={tipo.id_pais}>
                                                {tipo.s_nombre}
                                            </MenuItem>
                                        ))}
                                    </StyledSelect>
                                    <StyledTextField
                                        name="residencia"
                                        label="Residencia"
                                        placeholder="Residencia"
                                        size="small"
                                        value={values.residencia}
                                        onChange={(e) => setFieldValue('residencia', e.target.value)}
                                    />
                                </div>
                                <div className={style.Formulario_Errores}>
                                    <ErrorMessage name="nombre" component={() => <p className={style.Error}>{errors.nombre}</p>} />
                                    <ErrorMessage name="apellido_uno" component={() => <p className={style.Error}>{errors.apellido_uno}</p>} />
                                    <ErrorMessage name="tipodocumento" component={() => <p className={style.Error}>{errors.tipodocumento}</p>} />
                                    <ErrorMessage name="documento" component={() => <p className={style.Error}>{errors.documento}</p>} />
                                    <ErrorMessage name="fecha_nacimiento" component={() => <p className={style.Error}>{errors.fecha_nacimiento}</p>} />
                                    <ErrorMessage name="telefono" component={() => <p className={style.Error}>{errors.telefono}</p>} />
                                    <ErrorMessage name="pais" component={() => <p className={style.Error}>{errors.pais}</p>} />
                                    <ErrorMessage name="residencia" component={() => <p className={style.Error}>{errors.residencia}</p>} />
                                </div>
                                <ButtonSubmit
                                    id={0}
                                    isLoading={isLoading}
                                    isSubmitting={isSubmitting}
                                    onClose={onClose}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}

export default AddPersona