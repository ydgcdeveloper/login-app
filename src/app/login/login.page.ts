import { DestroyComponent } from './../components/destroy/destroy.component';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { login, loginSuccess } from '../store/auth';
import { takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../store';

import { eye, eyeOff, logIn } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-login-test',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage extends DestroyComponent implements OnInit, OnDestroy {
  fb: FormBuilder = inject(FormBuilder);
  loginForm: FormGroup;
  inputPassType: string = 'password';
  logging$ = this.authService.logging$;

  constructor(
    private store: Store<AuthState>,
    private router: Router,
    private actions$: Actions,
    private authService: AuthService
  ) {
    super();
    addIcons({
      'eye': eye,
      'eye-off': eyeOff,
    });
  }

  ngOnInit() {
    this.initForm();
    this.actions$
      .pipe(ofType(loginSuccess), takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response.data.success) {
          this.authService.setAuthenticatedUser(response.data);
          this.router.navigateByUrl('', { replaceUrl: true });
          this.authService.presentToast('Inicio exitoso', 'success');
        } else {
          this.authService.presentToast(response.data.message, 'error');
        }
      });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  toogleVisibility() {
    console.log('toogleVisibility');
    this.inputPassType =
      this.inputPassType === 'password' ? 'text' : 'password';
  }

  login() {
    const formValue = this.loginForm.value;
    this.store.dispatch(login({ data: formValue }));
  }
}
