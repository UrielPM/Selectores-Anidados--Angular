import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, combineLatest} from 'rxjs';
import { PaisSmall, Pais } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {


  private Url: string = 'https://restcountries.com/v2';
  private _regiones: string[] =['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']; 

  get regiones(): string[]{
    return [ ...this._regiones ];
  }
  constructor( private http: HttpClient) { }

  getPaisesPorRegion( region: string): Observable<PaisSmall[]>{
    const url: string =`${this.Url}/region/${region}?fields=name,alpha3Code`
       return this.http.get<PaisSmall[  ]>( url);
  }

  getPaisPorCodigo(codigo: string):Observable<Pais | null>{
    if (!codigo){
      return of(null)

    }
    const url: string = `${this.Url}/alpha/${codigo}`;
        return this.http.get<Pais>(url);

  }

  getPaisPorCodigoSmall(codigo: string):Observable<PaisSmall>{
  

    const url: string = `${this.Url}/alpha/${codigo}?fields=name,alpha3Code `;
        return this.http.get<PaisSmall>(url);

  }

  getPaisPorFrontera(borders: string[]): Observable<PaisSmall[]>{
  
    if( !borders){
      return of([]); 
    }

    const peticiones: Observable<PaisSmall>[] = [];

    borders.forEach( codigo => {
      const peticion = this.getPaisPorCodigoSmall(codigo); 
      peticiones.push(peticion);
    });

    return combineLatest( peticiones);
  }
  
}
 