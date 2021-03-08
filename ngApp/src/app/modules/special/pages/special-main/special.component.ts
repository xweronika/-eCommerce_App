import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SpecialService } from 'src/app/core/services/special.service';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {
  public veryfication = false;
  public error: string;
  public fertilization = 'assets/img/special_menu/fertilization.png';
  public transplantation = 'assets/img/special_menu/transplantation.png';
  public watering = 'assets/img/special_menu/watering.png';
  public cats = 'assets/img/special_menu/cats.png';
  public airCleaning = 'assets/img/special_menu/air_cleaning.png';
  public irradiation = 'assets/img/special_menu/irradiation.png';
  public pots = 'assets/img/special_menu/pots.png';
  public arrangements = 'assets/img/special_menu/arrangements.png';

  constructor(private specialService: SpecialService, private router: Router) { }

  ngOnInit() {
    // this.specialService.getSpecial()
    //   .subscribe(
    //     res => this.veryfication = res,
    //     err => {
    //       if (err instanceof HttpErrorResponse) {
    //         if (err.status === 401) {
    //           this.router.navigate(['/auth/login']);
    //           // jesli weryfikacja logowania nie powiodla sie - przejdz do trasy logowania
    //         }
    //       }
    //     });
  }
}
