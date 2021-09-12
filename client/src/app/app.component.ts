import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { City } from './models/City';
import { DataStorageService } from './services/data-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  filteredCity = '';
  cities = []
  pageNumber: number = 1
  showMoreBtn: boolean = true;



  constructor(private http: HttpClient, private dataStorageService: DataStorageService) {

  }

  getCitiesStartsWith(searchText: HTMLInputElement) {
    this.pageNumber = 1;
    this.showMoreBtn = true
    if (searchText.value != '') {
      this.dataStorageService.fetchCitiesStartWith(searchText.value, this.pageNumber, 10).subscribe(res =>

        this.cities = res.length != 0 ? res as City[] : [{ cityName: "No Record Found", country: "", subCountry: "" } as any]


      )
    }
    else {
      this.cities = []
    }
  }

  showMoreResults(searchText: HTMLInputElement) {
    this.pageNumber++;
    // data.length != 0 ? data as City[] : [{ cityName: "No Record Found", country: "", subCountry: "" } as any]

    this.dataStorageService.fetchCitiesStartWith(searchText.value, this.pageNumber, 10).
      subscribe(res => { 
       if (res.length != 0) {
        this.cities = this.cities.concat(res)
       } else {
        this.showMoreBtn = false;
       }
       
      }
      )

  }
}
