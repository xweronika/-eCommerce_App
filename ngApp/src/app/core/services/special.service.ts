import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Special {
  category: string;
  name: string;
  description: string;
  imageUrl?: [];
  imageUrl2?: string;
  description2?: string;
  listOfplants?: [];
}

@Injectable({
  providedIn: 'root'
})
export class SpecialService {

  private specialUrl = 'http://localhost:3000/api/special/special';

  constructor(private http: HttpClient) { }

  getSpecial() {
    return this.http.get<any>(this.specialUrl);
  }

}
