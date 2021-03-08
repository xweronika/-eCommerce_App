import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialService } from 'src/app/core/services/special.service';

@Component({
  selector: 'app-arrangements',
  templateUrl: './arrangements.component.html',
  styleUrls: ['./arrangements.component.css']
})
export class ArrangementsComponent implements OnInit {
  salon = 'assets/img/arrangements_menu/salon.png';
  study = 'assets/img/arrangements_menu/study.png';
  bedroom = 'assets/img/arrangements_menu/bedroom.png';
  kitchen = 'assets/img/arrangements_menu/kitchen.png';
  bathroom = 'assets/img/arrangements_menu/bathroom.png';
  return = 'assets/img/arrangements_menu/return.png';

  constructor(private specialService: SpecialService, private router: Router) { }

  ngOnInit() {
  }
}
