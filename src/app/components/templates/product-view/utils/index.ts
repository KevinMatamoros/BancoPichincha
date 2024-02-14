import { tableHeaders } from "@organism";

export enum valueTableHeader {
  LOGO = 'img',
  TEXT = 'text',
  DATE = 'date',
 }

export const defaultTableHeaders: tableHeaders[] = [
  { label: 'Logo', value: valueTableHeader.LOGO },
  { label: 'Nombre del producto', value: valueTableHeader.TEXT },
  { label: 'Descripcion', value: valueTableHeader.TEXT },
  { label: 'Fecha de liberacion', value: valueTableHeader.DATE },
  { label: 'Fecha de reestructuracion', value: valueTableHeader.DATE },
];
