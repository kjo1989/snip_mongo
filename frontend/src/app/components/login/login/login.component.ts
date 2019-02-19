import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../../../services/auth.service';
import {JwtService} from '../../../services/jwt.service';
import {LocalStorageService} from '../../../services/localStorage.service';
import {joinItems} from '../../../models/JOIN_ITEMS';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormGroup = this.fb.group({
    email: [this.localstorageService.getItem('mail') || '', [Validators.required, Validators.email]],
    password: [this.localstorageService.getItem('pswd') || '', [Validators.required, Validators.minLength(3)]]
  });

  public submitted = false;

  public joinItems = joinItems;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private authService: AuthenticationService,
              private jwtService: JwtService,
              private localstorageService: LocalStorageService) {
  }

  get email() {
    return this.loginFormGroup.get('email');
  }

  get password() {
    return this.loginFormGroup.get('password');
  }

  ngOnInit() {
  }


   logIn(): void {
    this.submitted = true;
     const email = this.loginFormGroup.get('email').value;
     const password = this.loginFormGroup.get('password').value;
    this.authService.login({email, password}).subscribe(resp => {
      if (!resp.isError) {
        this.jwtService.saveToken(resp.responceData);
        console.log(resp.responceStatusCode);
        alert(resp.responceMessage);
        this.router.navigate(['/dashboard']);
      } else {
        if (resp.responceStatusCode === 401) {
          console.error(resp.responceStatusCode);
          alert('You haven\'n activated the Email.');
          const conf = confirm(resp.responceMessage);
          alert(conf);
        }
        else {
          this.submitted = false;
          this.loginFormGroup.reset();
          console.error(resp.responceStatusCode);
          this.jwtService.destroyToken();
          alert(resp.responceMessage);
        }
      }
    },
      error1 => {
      this.submitted = false;
      this.loginFormGroup.reset();
      console.log(error1.error.statusCode);
      console.log(error1.error.message);
      console.log(error1);
      });
   }

}
