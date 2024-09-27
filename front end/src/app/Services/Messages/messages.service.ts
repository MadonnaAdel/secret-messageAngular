import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private clintHttp: HttpClient) { }

    sendMessage(message:string): Observable<any>{
    return this.clintHttp.post<any>(`${environment.apiUrl}/api/Opinion/AddOpinion`, {message});
  }
    getAllMessaages(): Observable<any>{
    return this.clintHttp.get<any>(`${environment.apiUrl}/api/Opinion/GetAll`);
  }
  
  deleteMessage(id: any): Observable<any> {
    return this.clintHttp.delete<any>(`${environment.apiUrl}/api/Opinion/DeleteOpinion`, {
      params: { id: id },
      responseType: 'text' as 'json'
    });
  }
}
