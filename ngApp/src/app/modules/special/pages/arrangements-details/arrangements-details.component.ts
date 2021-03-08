import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Special } from 'src/app/core/services/special.service';
import {default as data} from '../../special.json';

@Component({
  selector: 'app-arrangements-details',
  templateUrl: './arrangements-details.component.html',
  styleUrls: ['./arrangements-details.component.css']
})
export class ArrangementsDetailsComponent implements OnInit, OnDestroy {
  private subscribe: Subscription;
  category: string;
  specials = data as Special[]; // tekst poradnika z pliku json
  specialsFiltered: Special[] = []; // wyswietla tylko jedna kategorie poradnika

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscribe = this.route.paramMap
      .subscribe(params => { // pobiera kategorie ze sciezki url
        this.category = params.get('category'); // i przypisuje ja do zmiennej
        this.specialsFiltered = this.specials.filter(({ category }) => category === this.category);
        // filtrowanie kategorii z pliku json
      });
  }
  ngOnDestroy() {
    // funkcja unsubskrypcji, ktora wypisuje z subskrypcji
    // aby nie dopuscic do wycieku danych
    this.subscribe.unsubscribe();
  }

}
