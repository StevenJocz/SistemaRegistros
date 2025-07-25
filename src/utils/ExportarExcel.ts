import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Exporta un arreglo de objetos a un archivo Excel (.xlsx).
 * 
 * @param data - Array de datos a exportar.
 * @param nombreArchivo - Nombre del archivo de salida (sin extensión).
 */
export const exportarExcel = (data: any[], nombreArchivo: string = 'datos') => {
  if (!data || data.length === 0) {
    console.warn('No hay datos para exportar.');
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(blob, `${nombreArchivo}.xlsx`);
};
