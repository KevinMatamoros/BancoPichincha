import { HttpHeaders } from '@angular/common/http';

export const base_url =
  'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/';
export const headers:
  | HttpHeaders
  | {
      [header: string]: string | string[];
    }
  | undefined = {
  authorId: '200',
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json;charset=UTF-8'
};
