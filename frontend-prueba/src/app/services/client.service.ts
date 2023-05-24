import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  url = `${environment.hostUrl}/reto/services/clients`;

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<any> {
    return this.http.get(this.url.toString());
  }
  deleteClients(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
  createClients(body: any) {
    return this.http.post(this.url, body);
  }
  updateClients(body: any, id: string) {
    return this.http.put(`${this.url}/${id}`, body);
  }
}
