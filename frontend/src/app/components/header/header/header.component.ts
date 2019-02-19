import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {debug} from "util";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }
  goToPage(link) {
    this.router.navigate([link]);
  }
}
