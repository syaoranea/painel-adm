import { HttpClient } from '@angular/common/http';
import { Photo } from './../../views/pages/apps/fotos/interface/photos.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  private apiurl = environment.apiUrl;

  private userDataEmitter$ = new BehaviorSubject<Array<Photo> | null>(null);
  fotoData: Array<Photo> = [];
constructor(
  private http: HttpClient,
){}

  getAllFotos(): Observable<Array<any>> {
    return this.http.get<Array<Photo>>(
      `${this.apiurl}/api/gallery`,
    );
  }

  editFotos(requestData: Photo): Observable<void> {
    return this.http.put<void>(
      `${this.apiurl}/api/gallery/${requestData.id}`,
      requestData,
    );
  }

  deleteFotos(id: string): Observable<Photo> {
    return this.http.delete<Photo>(
      `${this.apiurl}/api/gallery/${id}`,
    );
  }

  createFotos(data: Photo): Observable<Photo> {
    return this.http.post<Photo>(
      `${this.apiurl}/api/gallery`,
      data
    );
  }

  setUserDatas(data: Array<Photo>): void {
    if (data) {
      this.userDataEmitter$.next(data);
      this.getfotosDatas();
    }

  }
  getfotosDatas() {
    this.userDataEmitter$.pipe(take(3)).subscribe({
      next: (response) => {
        if (response){
           this.fotoData = response;
        }
      },
    });
    return this.fotoData;
  }

}
