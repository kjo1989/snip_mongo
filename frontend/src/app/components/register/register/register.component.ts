import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import {joinItems} from '../../../models/JOIN_ITEMS';
import {AuthenticationService} from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../../../models/User';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerFormGroup = this.fb.group({
    name: ['', [Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(5), this.confirmPasswordsValidator()]]
  });

  public joinItems = joinItems;

  public submitted = false;

  public userEmailLink = 'https://www.';

  public isRegistered = false;

  get name() {
    return this.registerFormGroup.get('name');
  }

  get email() {
    return this.registerFormGroup.get('email');
  }

  get password() {
    return this.registerFormGroup.get('password');
  }

  get confirmPassword() {
    return this.registerFormGroup.get('confirmPassword');
  }

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
  }

  registration() {
     this.submitted = true;

    const name = this.registerFormGroup.get('name').value;

    const email = this.registerFormGroup.get('email').value;

    const password = this.registerFormGroup.get('password').value;

    const statusActivated = false;


    this.authService.register({name, email, password, statusActivated}).subscribe((resp) => {
      this.submitted = true;
        if (resp.isError) {
           this.submitted = false;
          console.error(resp.responceStatusCode);
        } else {
          this.isRegistered = true;
          this.userEmailLink = this.userEmailLink + email.slice(email.indexOf('@') + 1);
          this.submitted = true;
          console.log(resp.responceStatusCode);
        }
        alert(resp.responceMessage);
    },
      error1 => {
      this.submitted = false;
      this.registerFormGroup.reset();
      console.log(error1.error.statusCode);
      console.log(error1.error.message);
      });
  }

  confirmPasswordsValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const passwordValue = this.registerFormGroup && this.registerFormGroup.get('password').value;
      const wrongPassword = !(control.value === passwordValue);
      return wrongPassword ? {'notConfirm': {value: control.value}} : null;
    };
  }

  confirmRegistration() {
    // this.router.navigate([this.userEmailLink]);
  }

}
