import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/City';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient) { }

  // getCitiesStartWith(): Observable<City[]> {
  //   return this.http.get<City[]>
  //     (
  //     )

  // }


  fetchCitiesStartWith(searchText, PageNumber, PageSize): Observable<any[]> {

    if (searchText == "") {
      console.log("no")
      return;
    }
    let params = new HttpParams({
      fromString: 'SearchText=' + searchText + '&PageNumber=' + PageNumber
        + '&PageSize=' + PageSize
    });

    return this.http
      .get<City[]>(
        'https://localhost:5001/api/Cities/fetchCities'
        ,
        { params: params }
      )
      .pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
          (data: any) => {
            console.log("data", data)
            console.log("data.length != 0", data.length != 0)

            return data
          }
        ));

  }


}
