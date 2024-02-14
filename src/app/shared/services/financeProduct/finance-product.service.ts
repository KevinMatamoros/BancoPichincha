import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { base_url, headers } from './utils';
import { FinanceProduct } from '../../models/financeProduct.model';

@Injectable({
  providedIn: 'root',
})
export class FinanceProductService {
  constructor(private http: HttpClient) {}

  // Observable<FinanceProduct>
  getFinanceProducts(): Observable<any> {
    return this.http.get(`${base_url}bp/products`, { headers: headers });
  }

  checkFinanceProduct(params: {id: string}): Observable<any> {
    return this.http.get(`${base_url}bp/products/verification`, { headers: headers, params });
  }

  createFinanceProduct(financeProduct: FinanceProduct): Observable<any> {
    return this.http.post(`${base_url}bp/products`, financeProduct, { headers: headers });
  }

  editFinanceProduct(financeProduct: FinanceProduct): Observable<any> {
    return this.http.put(`${base_url}bp/products`, financeProduct, { headers: headers });
  }

  deleteFinanceProduct(params: {id: string}): Observable<any> {
    return this.http.delete(`${base_url}bp/products`, { headers: headers, params });
  }
}
