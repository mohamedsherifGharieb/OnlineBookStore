import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../Types/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'https://localhost:5002/api/order/buyer';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    const headers = this.UserGetToken();

    return this.http.get<Order[]>(this.apiUrl, { headers });
  }

  cancelOrder(id: string): Observable<void> {
    const headers = this.UserGetToken();

    return this.http.delete<void>(`https://localhost:5002/api/order/${id}`, { headers });
  }

  
  UserGetToken(): HttpHeaders {
    const userString = localStorage.getItem('user');
    let headers = new HttpHeaders();
    if (userString) {
      try {
        const user = JSON.parse(userString) as { token?: string };
        if (user?.token) {
          headers = headers.set('Authorization', `Bearer ${user.token}`);
        }
      } catch {}
    }
    return headers;
  }
}

