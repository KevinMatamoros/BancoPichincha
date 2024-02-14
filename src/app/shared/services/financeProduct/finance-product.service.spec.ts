import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { FinanceProduct } from '../../models/financeProduct.model';

import { FinanceProductService } from './finance-product.service';
import { base_url, headers } from './utils';

describe('FinanceProductService', () => {
  let service: FinanceProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [FinanceProductService],
      imports: [HttpClientTestingModule],
    });
  }));

  beforeEach(() => {
    service = TestBed.inject(FinanceProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get finance products', () => {
    const mockFinanceProducts = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];

    service.getFinanceProducts().subscribe((financeProducts) => {
      expect(financeProducts).toEqual(mockFinanceProducts);
    });

    const req = httpTestingController.expectOne(`${base_url}bp/products`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockFinanceProducts);
  });

  it('should make a GET request to the correct endpoint with the provided id parameter', () => {
    const id = '123';

    const http = TestBed.inject(HttpClient);
    const httpGetSpy = spyOn(http, 'get').and.returnValue(of('Test result.'));

    service.checkFinanceProduct({ id }).subscribe(() => {
      expect(httpGetSpy).toHaveBeenCalledWith(
        `${base_url}bp/products/verification`,
        {
          headers: headers,
          params: { id: id },
        }
      );
    });
  });

  it('should create a finance product with valid input data', () => {
    const financeProduct = new FinanceProduct();
    const response = service.createFinanceProduct(financeProduct);
    expect(response).toBeTruthy();
  });

  it('should send a PUT request to the correct endpoint with the finance product data', () => {
    const http = TestBed.inject(HttpClient);
    const httpClientSpy = spyOn(http, 'put').and.returnValue(
      of('Test result.')
    );

    const financeProduct = new FinanceProduct(
      '1',
      'Test Product',
      'Test Description',
      'test_logo.png'
    );

    service.editFinanceProduct(financeProduct).subscribe(() => {
      expect(httpClientSpy).toHaveBeenCalledWith(
        `${base_url}bp/products`,
        financeProduct,
        { headers: headers }
      );
    });
  });

  it('should send a DELETE request to the correct URL with the given ID parameter', () => {
    const id = '123';
    const http = TestBed.inject(HttpClient);
    const httpClientSpy = spyOn(http, 'delete').and.returnValue(
      of('Test result.')
    );

    service.deleteFinanceProduct({ id }).subscribe(() => {
      expect(httpClientSpy).toHaveBeenCalledWith(`${base_url}bp/products`, {
        headers: headers,
        params: { id },
      });
    });
  });
});
