import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { selectLogging } from '../store/auth';
import { AuthState } from '../store';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logging$ = this.store.select(selectLogging);

  constructor(
    private store: Store<AuthState>,
    private httpClient: HttpClient,
    private toastController: ToastController
  ) {}

  login(data: any) {
    return this.httpClient
      .post(environment.apiUrl, data)
      .pipe(map((data: any) => data));
  }

  isAuthenticated() {
    return localStorage.getItem('token');
  }

  setAuthenticatedUser(data: any) {
    console.log('data', data);
    if (!data) {
      return;
    }
    localStorage.setItem('token', data.payload.token);
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: data.payload.id,
        name: data.payload.name,
        email: data.payload.email,
      })
    );
  }

  logOut() {
    return of(localStorage.clear());
  }

  async presentToast(message, color: 'success' | 'error') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      positionAnchor: 'header',
      color: color === 'success' ? 'success' : 'danger',
      animated: true,
    });

    await toast.present();
  }
}
