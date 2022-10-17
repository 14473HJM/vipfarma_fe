import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL: string = `http://localhost:8080/products`;
  constructor(private http: HttpClient) { }

  obtener(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }
}


