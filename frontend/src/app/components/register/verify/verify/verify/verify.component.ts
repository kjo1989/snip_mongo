import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../../services/auth.service';
import { UrlSerializer} from '@angular/router';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  public loading = false;

  public responceMessage: string;

  constructor(private auth: AuthenticationService,
              private router: Router,
              private urlSerializer: UrlSerializer) {
    this.verify();
  }

  ngOnInit() {
  }

  verify() {
    this.loading = true;
    const parsedUrl = this.urlSerializer.parse(this.router.url);
    this.auth.verify({queryParams: parsedUrl.queryParams.token_name}).subscribe(resp => {
      if (!resp.isError) {
        setTimeout(() => this.router.navigate(['/sign_in']), 1500);
      } else {
        console.error(resp.responceStatusCode);
      }
      this.loading = false;
      this.responceMessage = resp.responceMessage;
    });
  }
}
