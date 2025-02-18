import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { StorageService } from './StorageService';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  http = inject(HttpClient);
  storage = inject(StorageService); // Injetar o serviço de armazenamento
  API = "http://localhost:3330/users"
  recover = "http://localhost:3330/users/recuperarSenha"
  token: any;
  

  constructor() { }

  listAll(): Observable<User[]>{ 
    return this.http.get<User[]>(this.API, {
      headers: this.createAuthorizationHeader()
    });
  }
  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.API}/me`, { headers: { Authorization: `Bearer ${this.token}` } });
}
  

  save(user:User): Observable<string>{ 
    return this.http.put<string>(this.API, user  ,{ responseType: 'text' as 'json',
     headers: this.createAuthorizationHeader()
    })
 }
 editPerfil(id: number, formData: FormData): Observable<User> {
  return this.http.put<User>(`${this.API}/${id}`,
    formData,
    {
      headers: this.createAuthorizationHeader(),
    }
  );
}
 sendRecoveryEmail(email: string): Observable<any> {
  return this.http.post(this.recover, { email });
}


 private createAuthorizationHeader(): HttpHeaders { // Cria a autorização (TOKEN) no cabeçalho
  const token = this.storage.getItem('auth_token'); // Obter o token do seu StorageService
  return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
}
}

