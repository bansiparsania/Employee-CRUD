import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
 
  baseApiUrl: string = "https://localhost:7131/api/Employee";

  constructor(private _http: HttpClient) {}

  addEmployee(data: any): Observable<any> {
    return this._http.post(this.baseApiUrl + '/add', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(this.baseApiUrl + `/edit`, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get(this.baseApiUrl);
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(this.baseApiUrl +`/delete?id=` + id);
  }


}
